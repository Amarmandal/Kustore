import React from "react";
import KhaltiCheckout from "khalti-checkout-web";
import { isAuthenticated } from "../auth/helper";

const LocalPayment = ({ products }) => {

  const getAllPrice = () => {
    if (products !== undefined) {
      const total = products.reduce((sum, current) => sum + current.price, 0);
      return total;
    }
  }

  // Esewa
  var path = "https://uat.esewa.com.np/epay/main";
  var params = {
    amt: getAllPrice() * 120,
    psc: 0,
    pdc: 0,
    txAmt: 0,
    tAmt: getAllPrice() * 120,
    pid: "ee2c3ca1-696b-4cc5-a6be-2c40d929d453",
    scd: "epay_payment",
    su: "https://kustore.netlify.app/success/purchase",
    fu: "https://kustore.netlify.app/failed/purchase"
  }

  const post = (path, params) => {
    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (var key in params) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", params[key]);
      form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
  }


  const handleEsewa = () => {
    post(path, params);
  }

  //Khalti

  var config = {
    "publicKey": "test_public_key_dc74e0fd57cb46cd93832aee0a390234",
    "productIdentity": "1234567890",
    "productName": "Single Bed",
    "productUrl": " ",
    "paymentPreference": [
      "MOBILE_BANKING",
      "KHALTI",
      "EBANKING",
      "CONNECT_IPS",
      "SCT",
    ],
    "eventHandler": {
      onSuccess(payload) {
        console.log(payload);
      },
      onError(error) {
        console.log(error);
      },
      onClose() {
        console.log('widget is closing');
      }
    }
  };

  var checkout = new KhaltiCheckout(config);

  const handleKhalti = function () {
    checkout.show({ amount: getAllPrice() * 12000 });
  }

  return (
    <div>
      {(isAuthenticated() && products !== undefined && products.length !== 0) &&
        <>
          <h3 className="my-3">Your Bill is NPR {getAllPrice() * 120}</h3>
          <button className="my-3 mx-3 ml-3 btn btn-lg btn-success" onClick={handleEsewa}>Pay with esewa</button>
          <button className="my-3 mx-3 btn btn-lg button-khalti" onClick={handleKhalti}>Pay with Khalti</button>
        </>
      }
    </div>
  )
}

export default LocalPayment;
