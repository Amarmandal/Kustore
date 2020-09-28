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

export const sendOTP = (userEmail) => {
  return fetch(`${API}/sendOtp`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userEmail)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err))
}

