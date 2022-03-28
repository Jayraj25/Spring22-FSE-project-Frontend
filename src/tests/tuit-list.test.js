import TuitsList from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {createTuit, findAllTuits} from "../services/tuits-service";
import axios from "axios";
import {UserList} from "../components/profile/user-list";
import {findAllUsers} from "../services/users-service";

// jest.mock('axios');

const MOCKED_USERS = [
<<<<<<< HEAD
    {_id: 34, username: "alice12", password: "alice123", email: "alice123@mail.com"},
    {_id: 25, username: "bob23", password: "bob789", email: "bob789@mail.com"},
    {_id: 17, username: "charlie34", password: "charlie234", email: "charlie234@mail.com"},
];

const MOCKED_TUITS = [
    {_id: 1, tuit: "alice's tuit", createdBy: MOCKED_USERS[0]},
    {_id: 2, tuit: "bob's tuit", createdBy: MOCKED_USERS[1]},
    {_id: 3, tuit: "charlie's tuit", createdBy: MOCKED_USERS[2]},
];

test('tuit list renders static tuit array', () => {
    render(
        <HashRouter>
            <UserList users={MOCKED_USERS}/>
            <TuitsList tuits={MOCKED_TUITS}/>
        </HashRouter>);
    const linkElementUser = screen.getByText(/alice12@alice12/i);
    expect(linkElementUser).toBeInTheDocument();
    const linkElement1 = screen.getByText(/alice's tuit/i);
    expect(linkElement1).toBeInTheDocument();
    const linkElement2 = screen.getByText(/bob's tuit/i);
    expect(linkElement2).toBeInTheDocument();
});

test('tuit list renders async', async () => {
    const users = await findAllUsers();
    const tuits = await findAllTuits();
    render(
        <HashRouter>
            <UserList users={users}/>
            <TuitsList tuits={tuits}/>
        </HashRouter>);
    const linkElementUser = screen.getByText(/nasa@nasa/i);
    expect(linkElementUser).toBeInTheDocument();
    const linkElement1 = screen.getByText(/In 2021, our @NASAPersevere Mars rover/i)
    expect(linkElement1).toBeInTheDocument();
    const linkElement2 = screen.getByText(/@SpaceX Dragon spacecraft returns to Earth with @ISS_Research /i)
    expect(linkElement2).toBeInTheDocument();
})

test('tuit list renders mocked', async () => {
    const mock = jest.spyOn(axios, 'get');
    mock.mockImplementation(() =>
        Promise.resolve({data: {users: MOCKED_USERS}}));
    mock.mockImplementation(() =>
        Promise.resolve({data: {tuits: MOCKED_TUITS}}));
    const responseTuits = await findAllTuits();
    mock.mockRestore();  // restore original implementation
    const mockedTuits = responseTuits.tuits;

    render(
        <HashRouter>
            <TuitsList tuits={mockedTuits}/>
        </HashRouter>);
    const linkElementUser = screen.getByText(/alice12/i);
    expect(linkElementUser).toBeInTheDocument();
    const linkElement1 = screen.getByText(/alice's tuit/i)
    expect(linkElement1).toBeInTheDocument();
=======
  {_id: 34, username: "alice12", password: "alice123", email: "alice123@mail.com"},
  {_id: 25, username: "bob23", password: "bob789", email: "bob789@mail.com"},
  {_id: 17, username: "charlie34", password: "charlie234", email: "charlie234@mail.com"},
];

const MOCKED_TUITS = [
  {_id: 1, tuit: "alice's tuit", createdBy: MOCKED_USERS[0]},
  {_id: 2, tuit: "bob's tuit", createdBy: MOCKED_USERS[1]},
  {_id: 3, tuit: "charlie's tuit", createdBy: MOCKED_USERS[2]},
];

test('tuit list renders static tuit array', () => {
  render(
      <HashRouter>
        <UserList users={MOCKED_USERS}/>
        <TuitsList tuits={MOCKED_TUITS}/>
      </HashRouter>);
  const linkElementUser = screen.getByText(/alice12@alice12/i);
  expect(linkElementUser).toBeInTheDocument();
  const linkElement1 = screen.getByText(/alice's tuit/i);
  expect(linkElement1).toBeInTheDocument();
  const linkElement2 = screen.getByText(/bob's tuit/i);
  expect(linkElement2).toBeInTheDocument();
});

test('tuit list renders async', async () => {
  const users = await findAllUsers();
  const tuits = await findAllTuits();
  render(
      <HashRouter>
        <UserList users={users}/>
        <TuitsList tuits={tuits}/>
      </HashRouter>);
  const linkElementUser = screen.getByText(/nasa@nasa/i);
  expect(linkElementUser).toBeInTheDocument();
  const linkElement1 = screen.getByText(/In 2021, our @NASAPersevere Mars rover/i)
  expect(linkElement1).toBeInTheDocument();
  const linkElement2 = screen.getByText(/@SpaceX Dragon spacecraft returns to Earth with @ISS_Research /i)
  expect(linkElement2).toBeInTheDocument();
})

test('tuit list renders mocked', async () => {
  const mock = jest.spyOn(axios, 'get');
  mock.mockImplementation(() =>
      Promise.resolve({data: {users: MOCKED_USERS}}));
  mock.mockImplementation(() =>
      Promise.resolve({data: {tuits: MOCKED_TUITS}}));
  const responseTuits = await findAllTuits();
  mock.mockRestore();  // restore original implementation
  const mockedTuits = responseTuits.tuits;

  render(
      <HashRouter>
        <TuitsList tuits={mockedTuits}/>
      </HashRouter>);
  const linkElementUser = screen.getByText(/alice12/i);
  expect(linkElementUser).toBeInTheDocument();
  const linkElement1 = screen.getByText(/alice's tuit/i)
  expect(linkElement1).toBeInTheDocument();
>>>>>>> A4-dislikes-feature
});
