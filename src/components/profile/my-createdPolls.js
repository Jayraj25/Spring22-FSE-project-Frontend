/**
 * @file renders the user's polls created screen
 */
import Polls from "../polls";
import * as service from "../../services/polls-service";
import {useEffect, useState} from "react";
import {findPollsByCreatedUser} from "../../services/polls-service";

/**
 * @function MyCreatedPolls
 * @returns {JSX.Element}  - renders the user's created poll screen
 * @constructor MyCreatedPolls
 */
const MyCreatedPolls = () => {
    const [createdPolls, setCreatedPolls] = useState([]);
    const findPollsICreated = () =>
        service.findPollsByCreatedUser("my")
            .then((pollsCreated) => setCreatedPolls(pollsCreated));
    useEffect(findPollsICreated, []);

    return(
        <div>
            <Polls polls={createdPolls} refreshPolls={findPollsICreated}/>
        </div>
    );
};
export default MyCreatedPolls;
