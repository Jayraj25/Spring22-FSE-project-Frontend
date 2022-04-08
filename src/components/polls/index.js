/**
 * @file renders the list of polls upon request.
 */
import React from "react";
// import './polls.css';
import Poll from "./poll";

/**
 * @component renders the list of polls upon request.
 * @param polls the list of polls to be rendered.
 * @param refreshPolls the function to refresh the list of polls.
 * @returns {JSX.Element} the list of polls.
 * @constructor creates the list of pools.
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
    // const deleteTuit = (tid) =>
    //     service.deleteTuit(tid)
    //         .then(refreshTuits);

    return (
        <div>
            <ul className="ttr-tuits list-group">
                {
                    polls.map && polls.map(poll =>
                        <Tuit key={poll._id}
                              poll={poll}/>)
                }
            </ul>
        </div>
    );
}

export default Polls;