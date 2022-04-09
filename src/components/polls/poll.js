/**
 * @file renders a poll component
 */
import React from "react";
import {useNavigate, Link} from "react-router-dom";
import {deletePoll} from "../../services/polls-service";

/**
 * @component Poll component renders individual polls
 * @returns {JSX.Element} - poll component
 * @constructor poll
 */
const Poll = ({poll}) => {
    console.log("poll" + poll.createdBy.username);
    const navigate = useNavigate();
    const daysOld = (tuit) => {
        const now = new Date();
        const nowMillis = now.getTime();
        const posted = new Date(tuit.postedOn);
        const postedMillis = posted.getTime();
        const oldMillis = nowMillis - postedMillis;
        let old = 0.0;
        const secondsOld = oldMillis/1000.0;
        const minutesOld = secondsOld/60.0;
        const hoursOld = minutesOld/60.0;
        const daysOld = hoursOld/24.0;
        if(daysOld > 1) {
            old = Math.round(daysOld) + 'd';
        } else if(hoursOld > 1) {
            old = Math.round(hoursOld) + 'h';
        } else if(minutesOld > 1) {
            old = Math.round(minutesOld) + 'm';
        } else if(secondsOld > 1) {
            old = Math.round(secondsOld) + 's';
        }
        return old;
    }
    return(
        // <li onClick={() => navigate(`/tuit/${tuit._id}`)}
        <li className="p-2 ttr-tuit list-group-item d-flex rounded-0">
            <div className="pe-2">
                {
                    poll.createdBy &&
                    <img src={`../images/${poll.createdBy.username}.jpg`}
                         className="ttr-tuit-avatar-logo rounded-circle" alt=""/>
                }
            </div>
            <div className="w-100">
                <i onClick={() => deletePoll(poll.createdBy, poll._id)} className="fas fa-remove fa-2x fa-pull-right"/>
                <Link to={`/poll/${poll._id}`}>
                    <i className="float-end fas fa-circle-ellipsis me-1"/>
                </Link>
                <h2
                    className="fs-5">
                    {poll.createdBy.username}@{poll.createdBy.username} -
                    <span className="ms-1">{daysOld(poll)}</span></h2>
                {poll.poll}
            </div>
        </li>
    );
}
export default Poll;