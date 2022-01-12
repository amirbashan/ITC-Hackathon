import axios from "axios";

const URL = `https://ride2gether-api.herokuapp.com/api/v1`;

export const signUpUser = (user) => {
  return axios
    .post(`${URL}/users/signup`, user)
    .then((response) => {
      return response.data;
    })
    .catch((error) => alert(error.response));
};

export const loginUser = (user) => {
  console.log(user);
  return axios
    .post(`${URL}/users/login`, user)
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

    .get(`${URL}/users/login`)
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
    .put(`http://localhost:8000/users/id/?id=${id}`, user, { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error));
};
