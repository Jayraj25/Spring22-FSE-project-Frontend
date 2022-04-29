/**
 * @file Gets the polls APIs for rendering in frontend
 */
import axios from "axios";


const BASE_URL = process.env.REACT_APP_BASE_URL;
console.log(BASE_URL);
const API = `${BASE_URL}/api`;
const POLLS_API = `${BASE_URL}/api/polls`;
const USERS_API = `${BASE_URL}/api/users`;

const api = axios.create({
    withCredentials: true
});

export const findPollResponsesByUser = (uid) =>
    api.get(`${USERS_API}/${uid}/pollsresponded`)
        .then(response => response.data);

export const findPollResponseByPollId = (pid) =>
    api.get(`${API}/responses/polls/${pid}`)
        .then(response => response.data);

export const findAllUsersReplyByPollId = (pid) =>
    api.get(`${API}/usersrepsonded/polls/${pid}`)
        .then(response => response.data);

export const createPollResponse = (uid,pid, pollResponse) =>
    api.post(`${API}/user/${uid}/response/polls/${pid}`, pollResponse)
        .then(response => response.data);

export const updatePollResponse = (uid,pid, pollResponse) =>
    api.post(`${USERS_API}/${uid}/poll/${pid}`, pollResponse)
        .then(response => response.data);

export const deleteResponse = (uid, pid) =>
    api.delete(`${USERS_API}/${uid}/deleteresponse/polls/${pid}`)
        .then(response => response.data);

export const userTogglesPollResponse = (uid, pid, pollResponse) =>
    api.put(`${USERS_API}/${uid}/poll/${pid}/response`, pollResponse)
        .then(response => response.data)

export const findPollResponseByPollIdByUserId = (uid, pid) =>
    api.get(`${USERS_API}/${uid}/response/polls/${pid}`)
        .then(response => response.data)