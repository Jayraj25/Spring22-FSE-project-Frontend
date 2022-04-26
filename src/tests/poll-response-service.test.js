/**
 * @jest-environment node
 */
import {createTuit, deleteTuitByContent, findAllTuits, findTuitById} from "../services/tuits-service";
import {createUser, deleteUsersByUsername} from "../services/users-service";
import {
    closePoll,
    createPoll,
    deletePoll,
    deletePollByQuestion,
    findAllPolls,
    findPollById
} from "../services/polls-service";
import {wait} from "@testing-library/user-event/dist/utils";
import {createPollResponse, updatePollResponse} from "../services/pollResponses-service";

const creator = {
    username: 'charlieTest',
    email: 'charlieTest@zeus.com',
    password: 'charlie@zeus',
}
const responder = {
    username: 'rachelTest',
    email: 'rachelTest@zeus.com',
    password: 'rachelTest@zeus',
}
const pollTest = {
    pollQuestion: "first Q",
    pollOptions: ["1o","2o"],
    createdBy: creator,
    closed: false
};

describe('can create Response with REST API', () => {

    const pollResponse = {
        // pollId:pollTest,
        // respondedBy:responder,
        chosenOption:1

    }

    // setup test before running test
    beforeAll(() => {
        // remove any/all user and polls to make sure we create it in the test
        deletePollByQuestion('first Q');
        deleteUsersByUsername(creator.username);
        return deleteUsersByUsername(responder.username);
    });

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        deletePollByQuestion('first Q');
        deleteUsersByUsername(creator.username);
        return deleteUsersByUsername(responder.username);
    });

    test('can create poll using Poll REST API', async () => {

        const newCreator = await createUser(creator);
        const newResponder = await createUser(responder);
        const newPoll = await createPoll(newCreator._id, pollTest);
        // console.log(newPoll._id);
        const newPollResponse = await createPollResponse(newResponder._id,newPoll._id,pollResponse)
        expect(newResponder.username).toEqual(responder.username);
        expect(newPoll.pollQuestion).toEqual(pollTest.pollQuestion);
        expect(newPollResponse.chosenOption).toEqual(pollResponse.chosenOption);

    });
});

describe('can create Response with REST API', () => {

    const creator = {
        username: 'charlieTest',
        email: 'charlieTest@zeus.com',
        password: 'charlie@zeus',
    }
    const responder = {
        username: 'rachelTest',
        email: 'rachelTest@zeus.com',
        password: 'rachelTest@zeus',
    }

    const pollTest = {
        pollQuestion: "first Q",
        pollOptions: ["1o","2o"],
        createdBy: creator,
        closed: true
    };
    const pollResponse = {
        // pollId:pollTest,
        // respondedBy:responder,
        chosenOption:1

    }


    // setup test before running test
    beforeAll(() => {
        // remove any/all user and polls to make sure we create it in the test
        deletePollByQuestion('first Q');
        deleteUsersByUsername(creator.username);
        return deleteUsersByUsername(responder.username);
    });

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        deletePollByQuestion('first Q');
        deleteUsersByUsername(creator.username);
        return deleteUsersByUsername(responder.username);
    });

    test('can not create poll response using Poll REST API, since poll is closed', async () => {

        const newCreator = await createUser(creator);
        const newResponder = await createUser(responder);
        const newPoll = await createPoll(newCreator._id, pollTest);
        // console.log(newPoll._id);
        try{
        const newPollResponse = await createPollResponse(newResponder._id,newPoll._id,pollResponse)
        }catch(e){
            expect(e).toString("Error: Request failed with status code 400")
        }
    });
});

describe('can create Response with REST API', () => {


    const pollResponse = {
        // pollId:pollTest,
        // respondedBy:responder,
        chosenOption:1

    }

    // setup test before running test
    beforeAll(() => {
        // remove any/all user and polls to make sure we create it in the test
        deletePollByQuestion('first Q');
        deleteUsersByUsername(creator.username);
        return deleteUsersByUsername(responder.username);
    });

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        deletePollByQuestion('first Q');
        deleteUsersByUsername(creator.username);
        return deleteUsersByUsername(responder.username);
    });

    test('can not create poll response using Poll REST API, since poll is closed', async () => {

        const newCreator = await createUser(creator);
        const newResponder = await createUser(responder);
        const newPoll = await createPoll(newCreator._id, pollTest);
        const newPollResponse = await createPollResponse(newResponder._id,newPoll._id,pollResponse)
        const newPollResponseChoice = await updatePollResponse()


    });
});
//not yet working
describe('can close poll with REST API', () => {

    const charlie2 = {
        username: 'charlieTest',
        email: 'charlieTest@zeus.com',
        password: 'charlie@zeus',
    }

    const pollTest2 = {
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
        const newPoll = await createPoll(newUser._id, pollTest2);

        expect(newUser.username).toEqual(charlie2.username);
        expect(newPoll.pollQuestion).toEqual(pollTest2.pollQuestion);
        expect(newPoll.closed).toEqual(pollTest2.closed);
        expect(newPoll.closed).toEqual(false);
        await closePoll(newUser._id, newPoll._id, newPoll);
        console.log(newPoll);
        await wait(4000);
        //add some time lag

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
        const poll2 = await createPoll(newUser._id, secondPoll);
        const result = await deletePoll(newUser._id, poll2._id);

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
    const user = {
        username: 'james123',
        email: 'james123@mail.com',
        password: 'james@123',
    };
    const polls = [
        {_id: 12, pollQuestion: "first Q",
            pollOptions: ["1o","2o"],
            createdBy: user,
            closed: true},
        {_id: 34, pollQuestion: "second Q",
            pollOptions: ["3o","4o"],
            createdBy: user,
            closed: false},
        {_id: 56, pollQuestion: "third Q",
            pollOptions: ["5o","6o","7o"],
            createdBy: user,
            closed: true},
    ];


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