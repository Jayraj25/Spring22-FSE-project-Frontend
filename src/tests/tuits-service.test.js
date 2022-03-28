import {createTuit, deleteTuit, deleteTuitByContent, findAllTuits, findTuitById} from "../services/tuits-service";
import { createUser, deleteUsersByUsername } from "../services/users-service";

describe('can create tuit with REST API', () => {

    const charlie = {
        username: 'charlieTest',
        email: 'charlieTest@zeus.com',
        password: 'charlie@zeus',
    }

    const warTuit = {
        tuit: 'War going on between Ukraine and Russia',
    };

    // setup test before running test
    beforeAll(() => {
        // remove any/all user and tuit to make sure we create it in the test
        deleteTuitByContent('War');
        return deleteUsersByUsername(charlie.username);
    });

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        deleteTuitByContent('War');
        return deleteUsersByUsername(charlie.username);
    });

    test('can insert new tuit using Tuit REST API', async () => {

        const newUser = await createUser(charlie);
        const newTuit = await createTuit(newUser._id,warTuit);

        expect(newUser.username).toEqual(charlie.username);
        expect(newTuit.tuit).toEqual(warTuit.tuit);
    });
});

describe('can delete tuit with REST API', () => {

    const user = {
        username: 'james123',
        email: 'james123@mail.com',
        password: 'james@123',
    };

    const dummyTuit = {
        tuit: "This is a dummy tuit"
    };

    beforeAll(() => {
        deleteUsersByUsername(user.username);
        deleteTuitByContent('dummy');
    });

    afterAll(() => {
        return deleteUsersByUsername(user.username);
    })

    test('can delete tuit using REST API',async () => {
        const newUser = await createUser(user);
        await createTuit(newUser._id, dummyTuit);
        const result = await deleteTuitByContent('dummy');
        expect(result.deletedCount).toBeGreaterThanOrEqual(1);
    });
});

describe('can retrieve a tuit by their primary key with REST API', () => {

    const user = {
        username: 'james123',
        email: 'james123@mail.com',
        password: 'james@123',
    };

    const dummyTuit = {
        tuit: "This is a dummyABC tuit"
    };

    beforeAll(() => {
        deleteUsersByUsername(user.username);
        deleteTuitByContent(dummyTuit.tuit);
    });

    afterAll(() => {
        deleteUsersByUsername(user.username);
        deleteTuitByContent(dummyTuit.tuit);
    });

    test('can read tuit by primary key from REST API', async () => {
        const newUser = await createUser(user);
        const newTuit = await createTuit(newUser._id,dummyTuit);
        //verify that the user and tuit is created
        expect(newUser.username).toEqual(user.username);
        expect(newTuit.tuit).toEqual(dummyTuit.tuit);

        //Get the tuit from the database using the primary key
        const existingTuit = await findTuitById(newTuit._id);

        //test that tuit retrieved using primary key is same as we created dummy tuit
        expect(existingTuit.tuit).toEqual(dummyTuit.tuit);
    });
});

describe('can retrieve all tuits with REST API', () => {
    const tuits = [
        'dummy1','dummy2','dummy3'
    ];
    const user = {
        username: 'james123',
        email: 'james123@mail.com',
        password: 'james@123',
    };

    beforeAll(async () => {
        const newUser = await createUser(user);
        tuits.map(tempTuit => deleteTuitByContent(`This is ${tempTuit} tuit`));
        tuits.map(tuitTemp => {
            createTuit(newUser._id,{
                tuit: `This is ${tuitTemp} tuit`,
            });
        });
    });

    afterAll(async () => {
        await deleteUsersByUsername(user.username);
        tuits.map(tempTuit => deleteTuitByContent(`This is ${tempTuit} tuit`));
    });

    test('Can read all users using REST API', async () => {
        const allTuits = await findAllTuits();

        // Check for minimum number of tuits
        expect(allTuits.length).toBeGreaterThanOrEqual(tuits.length);

        const tuitsWeInserted = allTuits.filter(
            filteredTuit => tuits.indexOf(filteredTuit.tuit) >= 0
        );

        tuitsWeInserted.forEach(tuit => {
            const findTuit = tuits.find(tempTuit => `This is ${tempTuit} tuit` === tuit.tuit);
            expect(tuit.tuit).toEqual(findTuit);
        })
    });
});