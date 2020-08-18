import React from "react";
import { API } from "../../backend";

const CardImage = ({product}) => {

    const imgUrl = product ? `${API}/product/photo/${product._id}` : `https://images.pexels.com/photos/3561340/pexels-photo-3561340.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;

    return(
        <img
            src={imgUrl}
            style={{ maxHeight: "100%", maxWidth: "100%" }}
            className="mb-3 rounded"
            alt=""
        />
    );
}

export default CardImage;
