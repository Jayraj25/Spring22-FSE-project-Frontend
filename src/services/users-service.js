import axios from "axios";
<<<<<<< HEAD
// const BASE_URL = "https://cs5500-01-sp22.herokuapp.com/api";
// const BASE_URL = "http://localhost:4000/api";
const BASE_URL = "https://intense-retreat-47646.herokuapp.com/api"
const LOGIN_API = `${BASE_URL}/login`;
const USERS_API = `${BASE_URL}/users`;
=======
// const BASE_URL = "https://cs5500-01-sp22.herokuapp.com";
//"http://localhost:4000";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const USERS_API = `${BASE_URL}/api/users`;
>>>>>>> A4-dislikes-feature

export const createUser = (user) =>
  axios.post(`${USERS_API}`, user)
    .then(response => response.data);

export const findAllUsers = () =>
<<<<<<< HEAD
    axios.get(`${USERS_API}`)
=======
    axios.get(USERS_API)
>>>>>>> A4-dislikes-feature
        .then(response => response.data);

export const findUserById = (uid) =>
    axios.get(`${USERS_API}/${uid}`)
        .then(response => response.data);

export const deleteUser = (uid) =>
  axios.delete(`${USERS_API}/${uid}`)
    .then(response => response.data);

export const deleteUsersByUsername = (username) =>
  axios.get(`${USERS_API}/username/${username}/delete`)
    .then(response => response.data);

<<<<<<< HEAD
export const findUserByCredentials = (credentials) =>
  axios.post(`${LOGIN_API}`, credentials)
    .then(response => response.data);

=======
>>>>>>> A4-dislikes-feature
const service = {
  findAllUsers
}

export default service;