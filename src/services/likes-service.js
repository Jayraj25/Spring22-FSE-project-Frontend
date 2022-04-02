import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const USERS_API = `${BASE_URL}/api/users`;
const TUITS_API = `${BASE_URL}/api/tuits`;

const api = axios.create({
  withCredentials: true
});

export const findAllTuitsLikedByUser = (userId) =>
    api.get(`${USERS_API}/${userId}/likes`)
        .then(response => response.data);

export const findAllUsersThatLikedTuit = (tid) =>
    api.get(`${TUITS_API}/${tid}/likes`)
        .then(response => response.data);


export const userLikesTuit = (userId, tid) =>
    api.put(`${USERS_API}/${userId}/likes/${tid}`)
        .then(response => response.data);

export const userTogglesTuitLikes = (uid, tid) => {
  console.log(uid,tid);
  api.put(`${USERS_API}/${uid}/likes/${tid}`)
      .then(response => {
        console.log(response.data);
        response.data
      });
}