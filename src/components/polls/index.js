/**
 * @file renders the list of polls upon request.
 */
import React from "react";
import Poll from "./poll";
import * as service from "../../services/polls-service";

/**
 * @component renders the list of polls upon request.
 * @param polls the list of polls to be rendered.
 * @param refreshPolls the function to refresh the list of polls.
 * @returns {JSX.Element} the list of polls.
 * @constructor creates the list of polls.
 */
const Polls = ({polls = [], refreshPolls}) => {
    // const likeTuit = (tuit) => {
    //     likesService.userLikesTuit("me", tuit._id).then(refreshTuits)
    //         .catch(e => alert(e))
    // }
    // const dislikeTuit = (tuit) => {
    //     dislikesService.userDislikesTuit("me", tuit._id)
    //         .then(refreshTuits)
    //         .catch(e => alert(e))
    // }
        const deletePoll = (uid,pid) =>
            service.deletePoll(uid,pid)
                .then(refreshPolls);

    return (
        <div>
            <ul className="ttr-tuits list-group">
                {
                    polls.map && polls.map(poll => <Poll key={poll._id} poll={poll}
                    deletePoll={deletePoll}/>)
                }
            </ul>
        </div>
    );
}

export default Polls;
