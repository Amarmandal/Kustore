import React, {useState, useEffect} from "react";
import {API} from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";
import Menu from "./Menu";
import Slideshow from "./Slideshow";


export default function Home() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);

    const loadAllProduct = () => {
        getProducts().then( data => {
            if(data.error) {
                setError(data.error);
            } else {
                setProducts(data);
            }
        });
    }

    useEffect(() => {
        loadAllProduct();
    }, []);

    return(
       <div>
           <Menu />
            <Slideshow />
            <div className="row m-0 text-center p-4">
            {products.map((product, index) => {
                return(
                    <div key={index} className="col-lg-3 col-md-6">
                        <Card
                        product={product}
                        />
                    </div>
                );
            })}
            </div>
            <footer className="footer py-3">
				<div className="container-fluid bg text-dark text-center py-3">
					<h4>If you want to add your products, please reach us out!</h4>
					<a className="btn btn-primary btn-lg" href="mailto:email.kustore@gmail.com">Contact Us</a>
				</div>
				<div className="container">
					<div className="text-muted text-center">
						&copy; 2020 <span className="text-dark">KU Store</span> All right reserved
                    </div>
				</div>
			</footer>
       </div>
    );
}


