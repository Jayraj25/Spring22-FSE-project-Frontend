/**
 * @file renders a poll component
 */
import React from "react";
import {useNavigate, Link} from "react-router-dom";
import {closePoll, createResponse, deletePoll, deleteResponse} from "../../services/polls-service";

/**
 * @component Poll component renders individual polls
 * @returns {JSX.Element} - poll component
 * @constructor poll
 */
const Poll = ({poll}) => {
    // console.log(poll);
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
            <div className="container">
                <div className="card-group">
                    <div className="col">
                        <div className="card shadow" style={{margin: "10px"}}>
                            <div className="row">
                                <div className="col-md-3" style={{margin:"20px"}}>
                                    <img src={""} alt='black' width='20' height='20'/>
                                    <Link to={`/polls/${poll._id}`}>{poll.createdBy}</Link>
                                </div>
                                <div className="col-md-4" style={{margin:"20px"}}>
                                    {poll.pollQuestion}
                                </div>
                                <div className="col-md-2" style={{margin:"20px"}}>
                                    <i onClick={() => deletePoll(poll.createdBy, poll._id)} className="fas fa-remove fa-2x fa-pull-right"/>
                                </div>
                            </div>
                            {poll.pollOptions.map((option,index) =>
                            <div key={index} className={"row justify-content-center"}>
                                <i onClick={() => createResponse("me", poll._id)} type="button" className="btn btn-outline-primary"
                                        style={{width: "300px",margin:"10px"}}>{option}</i>
                            </div>
                            )}
                            <div>
                                <i onClick={() => deleteResponse("me", poll._id)} type="button" className="btn btn-outline-primary btn-yellow"
                                   style={{width: "300px",margin:"10px"}}>Remove Response</i>
                            </div>
                            <div>
                                <i onClick={() => closePoll("me", poll._id)} type="button" className="btn btn-outline-primary"
                                   style={{width: "300px",margin:"10px"}}>Close Poll</i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}
export default Poll;