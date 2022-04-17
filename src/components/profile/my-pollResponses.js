/**
 * @file renders the user's pollResponses screen
 */
import Polls from "../polls";
import * as service from "../../services/pollResponses-service";
import {useEffect, useState} from "react";
import {findPollResponsesByUser} from "../../services/pollResponses-service";

/**
 * @function MyPollResponses
 * @returns {JSX.Element}  - renders the user's pollResponses screen
 * @constructor MyPollResponses
 */
const MyPollResponses = () => {
    const [respondedPolls, setRespondedPolls] = useState([]);
    const findPollsIRespond = () =>
        service.findPollResponsesByUser("my")
            .then((pollResponses) => setRespondedPolls(pollResponses));
    useEffect(findPollsIRespond, []);
    
    return(
        <div>
            {/*wait for ResponsePoll*/}
            <Polls polls={respondedPolls} refreshPolls={findPollsIRespond}/>
        </div>
    );
};
export default MyPollResponses;