/**
 * @jest-environment node
 */
import {createTuit, deleteTuitByContent, findAllTuits, findTuitById} from "../services/tuits-service";
import {createUser, deleteUsersByUsername} from "../services/users-service";
import {closePoll, createPoll, deletePollByQuestion, findAllPolls, findPollById} from "../services/polls-service";

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

describe('can create poll with REST API', () => {

    const charlie = {
        username: 'charlieTest',
        email: 'charlieTest@zeus.com',
        password: 'charlie@zeus',
    }

    const pollTest = {
        pollQuestion: "first Q",
        pollOptions: ["1o","2o"],
        createdBy: charlie,
        closed: true
    };

    // setup test before running test
    beforeAll(() => {
        // remove any/all user and polls to make sure we create it in the test
        deletePollByQuestion('first Q');
        return deleteUsersByUsername(charlie.username);
    });

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        deletePollByQuestion('first Q');
        return deleteUsersByUsername(charlie.username);
    });

    test('can create poll using Poll REST API', async () => {

        const newUser = await createUser(charlie);
        const newPoll = await createPoll(newUser._id, pollTest);

        expect(newUser.username).toEqual(charlie.username);
        expect(newPoll.pollQuestion).toEqual(pollTest.pollQuestion);
    });
});

//not yet working
describe('can close poll with REST API', () => {

    const charlie2 = {
        username: 'charlieTest',
        email: 'charlieTest@zeus.com',
        password: 'charlie@zeus',
    }

    const pollTest = {
        pollQuestion: "first Q",
        pollOptions: ["1o","2o"],
        closed: false
    };

    // setup test before running test
    beforeAll(() => {
        // remove any/all user and polls to make sure we create it in the test
        deletePollByQuestion('first Q');
        return deleteUsersByUsername(charlie2.username);
    });

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        deletePollByQuestion('first Q');
        return deleteUsersByUsername(charlie2.username);
    });


    test('can close poll using Poll REST API', async () => {

        const newUser = await createUser(charlie2);
        const newPoll = await createPoll(newUser._id, pollTest);

        expect(newUser.username).toEqual(charlie2.username);
        expect(newPoll.pollQuestion).toEqual(pollTest.pollQuestion);
        expect(newPoll.closed).toEqual(pollTest.closed);
        expect(newPoll.closed).toEqual(false);
        await closePoll(newUser._id, newPoll._id, newPoll);
        expect(newPoll.closed).toEqual(true);

    });
});
describe('can delete poll with REST API', () => {

    const user = {
        username: 'james123',
        email: 'james123@mail.com',
        password: 'james@123',
    };

    const secondPoll = {
        pollQuestion: "second Q",
        pollOptions: ["1o","2o"],
        closed: true
    };

    beforeAll(() => {
        deleteUsersByUsername(user.username);
        deletePollByQuestion('second Q');
    });

    afterAll(() => {
        return deleteUsersByUsername(user.username);
    })

    test('can delete poll using REST API',async () => {
        const newUser = await createUser(user);
        await createPoll(newUser._id, secondPoll);
        const result = await deletePollByQuestion('second Q');
        expect(result.deletedCount).toBeGreaterThanOrEqual(1);
    });
});

describe('can retrieve a poll by their primary key with REST API', () => {

    const user = {
        username: 'james123',
        email: 'james123@mail.com',
        password: 'james@123',
    };

    const thirdPoll = {
        pollQuestion: "third Q",
        pollOptions: ["1o","2o"],
        createdBy: user,
        closed: true
    };

    beforeAll(() => {
        deleteUsersByUsername(user.username);
        deletePollByQuestion(thirdPoll.pollQuestion);
    });

    afterAll(() => {
        deleteUsersByUsername(user.username);
        deletePollByQuestion(thirdPoll.pollQuestion);
    });

    test('can read poll by primary key from REST API', async () => {
        const newUser = await createUser(user);
        const newPoll = await createPoll(newUser._id,thirdPoll);
        //verify that the user and tuit is created
        expect(newUser.username).toEqual(user.username);
        expect(newPoll.pollQuestion).toEqual(thirdPoll.pollQuestion);

        //Get the tuit from the database using the primary key
        const existingPoll = await findPollById(newPoll._id);

        //test that tuit retrieved using primary key is same as we created dummy tuit
        expect(existingPoll.pollQuestion).toEqual(thirdPoll.pollQuestion);
    });
});

describe('can retrieve all polls with REST API', () => {
    const polls = [
        {_id: 12, pollQuestion: "first Q",
            pollOptions: ["1o","2o"],
            createdBy: MOCKED_USERS_1,
            closed: true},
        {_id: 34, pollQuestion: "second Q",
            pollOptions: ["3o","4o"],
            createdBy: MOCKED_USERS_1,
            closed: false},
        {_id: 56, pollQuestion: "third Q",
            pollOptions: ["5o","6o","7o"],
            createdBy: MOCKED_USERS_1,
            closed: true},
    ];
    const user = {
        username: 'james123',
        email: 'james123@mail.com',
        password: 'james@123',
    };

    beforeAll(async () => {
        const newUser = await createUser(user);
        await deletePollByQuestion("first Q");
        await deletePollByQuestion("second Q");
        await deletePollByQuestion("third Q");
        polls.map(poll => {
            createPoll(newUser._id,{
                pollQuestion: poll.pollQuestion,
                pollOptions: poll.pollOptions,
                closed: poll.closed
            });
        });
    });

    afterAll(async () => {
        await deleteUsersByUsername(user.username);
        await deletePollByQuestion("first Q");
        await deletePollByQuestion("second Q");
        await deletePollByQuestion("third Q");
    });

    test('Can read all polls using REST API', async () => {
        const allPolls = await findAllPolls();

        // Check for minimum number of tuits
        expect(allPolls.length).toBeGreaterThanOrEqual(polls.length);

        const pollsWeInserted = allPolls.filter(
            filteredPoll => polls.indexOf(filteredPoll.pollQuestion) >= 0
        );

        pollsWeInserted.forEach(poll => {
            const findPoll = polls.find(tempPoll => tempPoll.pollQuestion === poll.pollQuestion);
            expect(poll.pollQuestion).toEqual(findPoll);
        })
    });
});