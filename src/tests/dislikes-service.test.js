/**
 * @jest-environment node
 */
import {createTuit, deleteTuit, deleteTuitByContent, findAllTuits, findTuitById} from "../services/tuits-service";
import {deleteUsersByUsername, findUserById, createUser, findAllUsers} from "../services/users-service"
import {userDislikesTuit,findAllTuitsDislikedByUser} from "../services/dislikes-service"
import tuit from "../components/tuits/tuit";
// import {createUser} from "./services";
// import axios from "axios";
// axios.defaults.adapter = require('axios/lib/adapters/http');

describe('can create dislikes with REST API', () => {
    //   let testid;
    const user1 ={
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'

    };
    const tuit1 = {
        tuit: "tuittest1",
        // postedBy: user1,
        postedOn: "2022-03-22T00:00:00.000Z",

    };
    beforeAll(() => {

        let promises = []
        promises.push(deleteTuitByContent(tuit1.tuit));
        promises.push(deleteUsersByUsername(user1.username));
        return Promise.all(promises);
        //this won't work everytime!! need to return Promise.all to wait for every
        // function's callback
        // deleteTuitByContent(tuit1.tuit);
        // deleteUsersByUsername(user1.username);
        // return;

    });

    afterAll(() => {
        let promises = []
        promises.push(deleteTuitByContent(tuit1.tuit));
        promises.push(deleteUsersByUsername(user1.username));
        return Promise.all(promises);
    });

    test('can insert dislikes with REST API', async () => {

        try {
            //console.log("hello2");
            const newUser = await createUser(user1);
            // console.log(newUser);
            const newTuit = await createTuit(newUser._id, tuit1);
            // console.log(newTuit);
            const dislikeTuit = await userDislikesTuit(newUser._id, newTuit._id);
            const allDislikeTuits = await findAllTuitsDislikedByUser(newUser._id);
            // console.log(dislikeTuit)
            expect(dislikeTuit)
                .toEqual("OK");

        } catch (err) {
            // console.log("error !");
            // console.log(err);
            expect(err).toEqual(new Error());
        }
    });



});