/**
 * @file renders the user's polls responded screen
 */
import Polls from "../polls";
import * as service from "../../services/polls-service";
import {useEffect, useState} from "react";
import {findPollsByCreatedUser} from "../../services/polls-service";

/**
 * @function MyRespondedPolls
 * @returns {JSX.Element}  - renders the user's created poll screen
 * @constructor MyCreatedPolls
 */
const MyRespondedPolls = () => {
    const [respondedPolls, setRespondedPolls] = useState([]);
    const findPollsIResponded = () =>
        service.findPollsRespondedByUser("my")
            .then((pollsResponded) => setRespondedPolls(pollsResponded));
    useEffect(findPollsIResponded, []);

    return(
        <div>
            <Polls polls={respondedPolls} refreshPolls={findPollsIResponded}/>
        </div>
    );
};
export default MyRespondedPolls;
