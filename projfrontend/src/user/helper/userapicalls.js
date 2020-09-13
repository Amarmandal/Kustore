import { API } from "../../backend";

//Fetch all the orders made by users
export const getUserOrder = (userId, token) => {
    return fetch(`${API}/order/user/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.json();
    }).catch(err => console.log(err));
}

//Fetch all the products purchased by users
export const getSingleUser = (userId, token) => {
    return fetch(`${API}/user/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.json();
    }).catch(err => console.log(err));
}
