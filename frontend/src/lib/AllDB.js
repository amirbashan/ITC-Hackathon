import axios from "axios";

const URL = `https://ride2gether-api.herokuapp.com`;
const version = `/api/v1`;

axios.defaults.withCredentials = true;

export const signUpUser = (user) => {
  return axios
    .post(`${URL}${version}/users/signup`, user)
    .then((response) => {
      return response.data;
    })
    .catch((error) => alert(error.response));
};

export const loginUser = (user) => {
  console.log(user);
  return axios
    .post(`${URL}${version}/users/login`, user)
    .then((response) => {
      return response.data;
    })
    .catch((error) => alert(error.response.data));
};

// export const getBasicUserInfo = (token) => {
//   return axios

//     .get(`http://localhost:8000/users/myInfo`, { headers: { Authorization: `Bearer ${token}` } })
//     .then((response) => {
//       return response;
//     })
//     .catch((error) => alert(error.response));
// };

export const getOneUserInfo = () => {
  return axios

    .get(`${URL}${version}/users/me`)
    .then((response) => {
      console.log("response", response);
      return response.data;
    })
    .catch((error) => alert(error.response));
};

export const postRide = () => {
  return axios

    .post(`${URL}${version}/rides/`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => alert(error.response));
};

// export const getUsersTableInfo = (token) => {
//   return axios

//     .get(`http://localhost:8000/users/fullUserList`, { headers: { Authorization: `Bearer ${token}` } })
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => alert(error.response));
// };

export const editUserInfo = (token, user, id) => {
  return axios
    .put(`http://localhost:8000/users/id/?id=${id}`, user, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error));
};
