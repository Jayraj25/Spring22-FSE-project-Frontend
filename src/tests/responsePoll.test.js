/**
 * @jest-environment node
 */
import Poll from "../components/polls/poll";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {createTuit, findAllTuits} from "../services/tuits-service";
import axios from "axios";
import {UserList} from "../components/profile/user-list";
import {findAllUsers} from "../services/users-service";

// jest.mock('axios');

const MOCKED_USERS_1 = {_id: 25, username: "creator", password: "bob789", email: "bob789@mail.com"}
const MOCKED_USERS_2 = {_id: 52, username: "response", password: "bob789", email: "bsdf@mail.com"}
const MOCKED_POST = [
    {_id: 12, pollQuestion: "first Q",
        pollOptions: ["1o","2o"],
        createdBy: MOCKED_USERS_1,
        closed: true},
    {_id: 34, pollQuestion: "second Q",
        pollOptions: ["3o","4o"],
        createdBy: MOCKED_USERS_1,
        closed: false},
    {_id: 56, pollQuestion: "second Q",
        pollOptions: ["5o","6o","7o"],
        createdBy: MOCKED_USERS_1,
        closed: true},
];

const MOCKED_RESPONSE = [
    {_id: 1, pollId:MOCKED_POST[0], respondedBy: MOCKED_USERS_2,chosenOption:0},
    {_id: 1, pollId:MOCKED_POST[1], respondedBy: MOCKED_USERS_2,chosenOption:1},
    {_id: 1, pollId:MOCKED_POST[2], respondedBy: MOCKED_USERS_2,chosenOption:2}
];

test('response list renders static response array', () => {
    render(
        <HashRouter>
            <Poll poll={MOCKED_POST[0]}/>

        </HashRouter>);
    const linkElementUser = screen.getByText(/first Q/i);
    expect(linkElementUser).toBeInTheDocument();
    const linkElement1 = screen.getByText(/5o/i);
    expect(linkElement1).toBeInTheDocument();
    const linkElement2 = screen.getByText(/creator/i);
    expect(linkElement2).toBeInTheDocument();
});

// test('tuit list renders async', async () => {
//     const users = await findAllUsers();
//     const tuits = await findAllTuits();
//     render(
//         <HashRouter>
//             <UserList users={users}/>
//             <TuitsList tuits={tuits}/>
//         </HashRouter>);
//     const linkElementUser = screen.getByText(/nasa@nasa/i);
//     expect(linkElementUser).toBeInTheDocument();
//     const linkElement1 = screen.getByText(/In 2021, our @NASAPersevere Mars rover/i)
//     expect(linkElement1).toBeInTheDocument();
//     const linkElement2 = screen.getByText(/@SpaceX Dragon spacecraft returns to Earth with @ISS_Research /i)
//     expect(linkElement2).toBeInTheDocument();
// })
//
// test('tuit list renders mocked', async () => {
//     const mock = jest.spyOn(axios, 'get');
//     mock.mockImplementation(() =>
//         Promise.resolve({data: {users: MOCKED_USERS}}));
//     mock.mockImplementation(() =>
//         Promise.resolve({data: {tuits: MOCKED_TUITS}}));
//     const responseTuits = await findAllTuits();
//     mock.mockRestore();  // restore original implementation
//     const mockedTuits = responseTuits.tuits;
//
//     render(
//         <HashRouter>
//             <TuitsList tuits={mockedTuits}/>
//         </HashRouter>);
//     const linkElementUser = screen.getByText(/alice12/i);
//     expect(linkElementUser).toBeInTheDocument();
//     const linkElement1 = screen.getByText(/alice's tuit/i)
//     expect(linkElement1).toBeInTheDocument();
// });