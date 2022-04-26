/**
 * @jest-environment node
 */
import {createTuit, deleteTuitByContent, findAllTuits, findTuitById} from "../services/tuits-service";
import {createUser, deleteUsersByUsername} from "../services/users-service";
import {
    closePoll,
    createPoll,
    deletePoll,
    deletePollByQuestion, deleteResponse,
    findAllPolls,
    findPollById
} from "../services/polls-service";
import {wait} from "@testing-library/user-event/dist/utils";
import {
    createPollResponse, findPollResponseByPollId,
    findPollResponseByPollIdByUserId, findPollResponsesByUser,
    userTogglesPollResponse
} from "../services/pollResponses-service";

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
const responder2 = {
    username: 'riverTest',
    email: 'river@zeus.com',
    password: 'reasldkf@zeus',
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

describe('can not create Response when poll closed with REST API', () => {

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

describe('can toggle Response with REST API, and find a pollResponse with REST API', () => {


    const pollResponse = {
        // pollId:pollTest,
        // respondedBy:responder,
        chosenOption:1

    }
    const newUpdatedPollResponse = {
        // pollId:pollTest,
        // respondedBy:responder,
        chosenOption:0

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

    test('can toggle response using Poll REST API', async () => {

        const newCreator = await createUser(creator);
        const newResponder = await createUser(responder);
        const newPoll = await createPoll(newCreator._id, pollTest);
        await userTogglesPollResponse(newResponder._id,newPoll._id,pollResponse)
        const newPollResponse = await findPollResponseByPollIdByUserId(newResponder._id, newPoll._id)
        expect(newPollResponse.chosenOption).toEqual(pollResponse.chosenOption)

        await userTogglesPollResponse(newResponder._id,newPoll._id,newUpdatedPollResponse);
        const updatedPollResponse = await findPollResponseByPollIdByUserId(newResponder._id, newPoll._id)
        expect(updatedPollResponse.chosenOption).toEqual(newUpdatedPollResponse.chosenOption)
    });
});

describe('can delete response', () => {

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

    test('can delete a specified response', async () => {

        const newCreator = await createUser(creator);
        const newResponder = await createUser(responder);
        const newPoll = await createPoll(newCreator._id, pollTest);
        await userTogglesPollResponse(newResponder._id,newPoll._id,pollResponse)
        const result = await deleteResponse(newResponder._id, newPoll._id);
        expect(result.deletedCount).toBeGreaterThanOrEqual(1);

    });
});

describe('can retrieve all responses by PollId with REST API', () => {



    beforeAll(async () => {

        // await deletePollByQuestion("first Q");

    });

    afterAll(async () => {
        await deleteUsersByUsername(creator.username);
        await deleteUsersByUsername(responder.username);
        await deleteUsersByUsername(responder2.username);
        await deletePollByQuestion("first Q");

    });

    test('Can read all responses by certian pollId using REST API', async () => {
        const newUser = await createUser(creator);
        const newResponder1 = await createUser(responder);
        const newResponder2 = await createUser(responder2);
        const newPoll = await createPoll(newUser._id, pollTest);
        const pollResponses = [{
            chosenOption:100},{
            chosenOption:101}]
        const newResponse1 = await createPollResponse(newResponder1._id,newPoll._id,pollResponses[0])
        const newResponse2 = await createPollResponse(newResponder2._id,newPoll._id,pollResponses[1])
        const allResponseByPollId = await findPollResponseByPollId(newPoll._id);
        expect(allResponseByPollId.length).toBeGreaterThanOrEqual(2);

        const pollResponsesWeInserted = allResponseByPollId.filter(
            filteredPoll => pollResponses.indexOf(filteredPoll.chosenOption) >= 0
        );

        pollResponsesWeInserted.forEach(pollResponse => {
            const findPollResponse = pollResponses.find(tempPoll => tempPoll.pollQuestion === pollResponse.pollQuestion);
            expect(pollResponse.chosenOption).toEqual(findPollResponse);
        })
    });
});