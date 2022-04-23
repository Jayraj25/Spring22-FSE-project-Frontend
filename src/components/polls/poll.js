/**
 * @file renders a poll component
 */
import React, {useEffect, useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import {
    closePoll,
    createResponse,
    deletePoll,
    deleteResponse,
    findAllPolls,
    findPollResponseByPollIdByUserId
} from "../../services/polls-service";
import * as service from "../../services/polls-service";
import {findAllTuitsLikedByUser} from "../../services/likes-service";

/**
 * @component Poll component renders individual polls
 * @returns {JSX.Element} - poll component
 * @constructor poll
 */
const Poll = ({poll, deletePoll, closePoll}) => {
    // console.log(poll);
    const navigate = useNavigate();
    const [response, setResponse] = useState(0);
    const [responseName, setResponseName] = useState(0);
    const [isChosen, setIsChosen] = useState(false);

     useEffect(() => {
         const checkChosen = () => {
             service.findPollResponseByPollIdByUserId('my', poll._id).then(pollResponse => console.log(pollResponse));
             console.log(responseName);
             // console.log(JSON.stringify(pollResponse));
             // setResponseName(pollResponse.pollId);
         }
         checkChosen()}, [])
    const [recordedResponse, setRecordedResponse] = useState("no response");
    const [closed, setClosed] = useState('close poll');
    const [isClosed, setIsClosed] = useState(poll.closed);
    const recordResponse = () =>
        setRecordedResponse(responseName)
    // console.log(findPollResponseByPollIdByUserId('my',poll._id));
    const createResponse = () =>
        service.createResponse('my', poll._id, {chosenOption: response})
            .then(findAllPolls).then(recordResponse)
    const noResponse = () =>
        setRecordedResponse("no response")
    const deleteResponse = () =>
        service.deleteResponse('my', poll._id).then(noResponse)
    const pollClosed = () =>
        setClosed('poll is closed')
    const isPollClosed = () =>
        setIsClosed(poll.closed).then(findAllPolls)
    // isPollClosed();

    const daysOld = (poll) => {
        const now = new Date();
        const nowMillis = now.getTime();
        const posted = new Date(poll.postedOn);
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
                                    <Link to={`/polls/${poll._id}`}>{poll.createdBy.username}</Link>
                                </div>
                                <div className="col-md-4" style={{margin:"20px"}}>
                                    {poll.pollQuestion}
                                </div>
                                <div className="col-md-2" style={{margin:"20px"}}>
                                    <i onClick={() => deletePoll('my', poll._id)} className="fas fa-remove fa-2x fa-pull-right"/>
                                </div>
                            </div>
                            <div style={{margin: "10px"}}>
                               your current response: {recordedResponse}
                            </div>
                            {poll.pollOptions.map((option,index) =>
                            <div key={index} className={"row justify-content-center"}>

                                {
                                    isChosen ? <button value={index} onClick={() => {
                                            setResponse(index);
                                            setResponseName(option)
                                        }} type="button" className="btn btn-outline-primary"
                                                       style={{
                                                           width: "300px",
                                                           margin: "10px",
                                                           background: "blue"
                                                       }}>{option}</button> :
                                        <button value={index} onClick={() => {
                                            setResponse(index);
                                            setResponseName(option)
                                        }} type="button" className="btn btn-outline-primary"
                                                style={{width: "300px", margin: "10px"}}>{option}</button>
                                }
                            </div>
                            )}
                            <div className="row">
                                <div className="col-md-4">
                                    {
                                        isClosed ? <a  className="btn "
                                                      style={{ margin: "10px", marginTop: "33px",background: "grey"}}>poll is closed</a> : <a onClick={() => closePoll('my', poll._id).then(setIsClosed(true))} tabIndex="1" className="btn btn-outline-primary "
                                               style={{ margin: "10px", marginTop: "33px",background: "#DB7093"}}>close poll</a>
                                    }
                                </div>
                                <div className="col-md-4">
                                    {
                                        isClosed ? <a  className="btn"
                                                      style={{margin:"10px", marginTop: "33px", background: "grey"}}>Cannot Remove</a> : <a onClick={deleteResponse}  className="btn btn-outline-primary"
                                                                                                                                               style={{margin:"10px", background: "#FFD700"}}>Remove Response</a>
                                    }
                                </div>
                            <div className="col-md-4">
                                {
                                    isClosed ? <a  style={{margin:"10px", background: "grey"}}
                                                   className={`btn rounded-pill
                                fw-bold ps-4 pe-4 fa-pull-right`}>
                                        cannot submit
                                    </a> : <a  style={{margin:"10px"}} onClick={createResponse}
                                                                                                                                            className={`btn btn-primary rounded-pill
                                fw-bold ps-4 pe-4 fa-pull-right`}>
                                        submit response
                                    </a>
                                }
                            </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}
export default Poll;