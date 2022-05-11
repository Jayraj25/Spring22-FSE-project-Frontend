/**
 * @file renders the user's pollResponses screen
 */
import Polls from "../polls/index";
import * as service from "../../services/pollResponses-service";
import * as pollService from "../../services/polls-service"
import React, {useEffect, useState} from "react";
import {findPollResponsesByUser} from "../../services/pollResponses-service";
import Poll from "../polls/poll";

/**
 * @function MyPollResponses
 * @returns {JSX.Element}  - renders the user's pollResponses screen
 * @constructor MyPollResponses
 */
const MyPollResponses = () => {
    const [respondedPolls, setRespondedPolls] = useState([]);
    const findPollsIRespond = () =>
        //should change to find Poll object that responded by user
        service.findPollResponsesByUser("my")
            .then((pollResponses) => setRespondedPolls(pollResponses));
    // const
    const findPollByPollId = (pid) =>
        pollService.findPollById(pid)
    useEffect(findPollsIRespond, []);
    
    return(
        <div>
            {/*wait for ResponsePoll*/}

            <h1>poll response</h1>
            {JSON.stringify(respondedPolls)}
            {/*<Polls polls={respondedPolls} refreshPolls={findPollsIRespond} />*/}
            <div className="list-group">
            {respondedPolls.map(responsePoll=>{

                return(
                    JSON.stringify( findPollByPollId(responsePoll.pollId))
                    // JSON.stringify( responsePoll.pollId)

                        )
                }
            )
            }
            </div>

            {/*<Polls polls={respondedPolls}  />*/}
        </div>
    );
};
export default MyPollResponses;