import axios from "axios";

const baseUrl = "http://localhost:3002/";

function getAuthConfig(token) {
  return {
    headers: {
      "auth-token": token,
    },
  };
}

// export async function signup(firstName, lastName, phone, email, password, repeatPassword) {
//   const response = await axios.post(baseUrl + "/signup", {
//     firstName,
//     lastName,
//     phone,
//     email,
//     password,
//     repeatPassword,
//   });
//   return response.data;
// }

export async function login(email, password) {
  const response = await axios.post(baseUrl + "/login", {
    email,
    password,
  });
  console.log(response);
  return response.data;
}
