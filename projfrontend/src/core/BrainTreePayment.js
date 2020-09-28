import React, { useState, useEffect } from "react";
import { loadCart, cartEmpty } from "./helper/cartHelper";
import { Link, Redirect } from "react-router-dom";
import { getmeToken, processPayment } from "./helper/paymentHelper";
import { isAuthenticated } from "../auth/helper";
import DropIn from "braintree-web-drop-in-react";
import { createOrder } from "./helper/orderHelper";

const BrainTreePayment = ({ products, setReload = f => f, reload = undefined }) => {
	const [info, setInfo] = useState({
		loading: false,
		success: false,
		clientToken: null,
		error: "",
		instance: {}
	});

	const userId = isAuthenticated() && isAuthenticated().user._id;
	const token = isAuthenticated() && isAuthenticated().token;

	const getToken = (userId, token) => {
		getmeToken(userId, token).then(data => {
			if (data.error) {
				setInfo({ ...info, error: data.error });
			} else {
				const clientToken = data.clientToken;
				setInfo({ clientToken });
			}

		})
	}

	useEffect(() => {
		getToken(userId, token);
	}, [reload]);


	const getAllPrice = () => {
		if (products !== undefined) {
			const total = products.reduce((sum, current) => sum + current.price, 0);
			return total;
		}
	}

	const onPurchase = () => {
		setInfo({ loading: true });
		let nonce;

		let getNonce = info.instance
			.requestPaymentMethod()
			.then(data => {
				nonce = data.nonce;
				const paymentData = {
					paymentMethodNonce: nonce,
					amount: getAllPrice()
				};

				processPayment(userId, token, paymentData)
					.then(response => {
						const {success} = response;
						setInfo({ ...info, success: success, loading: false });
						const orderData = {
							products: products,
							transaction_id: response.transaction.id,
							amount: response.transaction.amount
						};
						createOrder(userId, token, orderData);
						cartEmpty(() => {
							console.log("Cart Succcessfully emptied");
						});
						setReload(!reload);
					})
					.catch(err => {
						setInfo({ loading: false, success: false });
						console.log("PAYMENT FAILED");
					})
			})
	}

	const brainTreeDropIn = () => (
		<div>
			<DropIn
				options={{ authorization: info.clientToken }}
				onInstance={(instance) => (info.instance = instance)}
			/>
			<button className="btn btn-block btn-info" onClick={onPurchase}>Buy</button>
		</div>

  )

  const performRedirectOnSuccess = () => {
    if(info.success) {
      return (
        <Redirect to="/success/purchase" />
      );
    } else {
      return (
        <div>
          <h3>Please Login Before Checkout</h3>
          <Link to="/signin" className="btn btn-warning btn-lg">Sign In to Checkout</Link>
        </div>
      );
    }
  }

	return (
		<div>
			{(info.clientToken !== null && (products !== undefined && products.length !== 0)) ? (
				<div>
					<h3>Your Bill is {getAllPrice()} $</h3>
					{brainTreeDropIn()}
				</div>
			) : performRedirectOnSuccess() }
		</div>
	)
}

export default BrainTreePayment;

