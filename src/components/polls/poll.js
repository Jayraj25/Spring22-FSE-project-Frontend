/**
 * @file renders a poll component
 */
import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {Modal} from "react-bootstrap";
import {CanvasJSChart} from "canvasjs-react-charts";
import {
    closePoll,
    createResponse,
    deletePoll,
    deleteResponse,
    findAllPolls,
    findPollById
} from "../../services/polls-service";
import * as service from "../../services/polls-service";

/**
 * @component Poll component renders individual polls
 * @returns {JSX.Element} - poll component
 * @constructor poll
 */
const Poll = ({poll, deletePoll}) => {
    const [response, setResponse] = useState(0);
    const [responseName, setResponseName] = useState("no response");
    const [recordedResponse, setRecordedResponse] = useState("no response");
    const [closed, setClosed] = useState('close poll');
    const [show, setShow] = useState(false);
    const [isClosed, setIsClosed] = useState(poll.closed);
    const [isResponded, setIsResponded] = useState(false);
    const [pollResponse, setPollResponse] = useState(null);
    const [responseDeleted, setResponseDeleted] = useState(false);

    const [pieData, setPieData] = useState([]);

    const handleShow = () => {
        setShow(true);
    }
    const handleClose = () => {
        setShow(false);
    }
    const recordResponse = () =>
        setRecordedResponse(responseName)
    const createResponse = () =>
        service.createResponse('my', poll._id, {chosenOption: response})
            .then(findAllPolls).then(recordResponse)
    const noResponse = () =>
        setRecordedResponse("no response")
    const deleteResponse = () => {
        setResponseDeleted(true);
        service.deleteResponse('my', poll._id).then(noResponse)
    }
    const pollClosed = () =>
        setClosed('poll is closed')

    const closePoll = () =>
        service.closePoll('my', poll._id).then(r =>
        {if (r.acknowledged)
        {
            setIsClosed(true)
            setClosed('poll is closed')
        }
        })
    const isPollClosed = () =>
        setIsClosed(poll.closed).then(findAllPolls)

    const selectOption = (pollId,optionIndex) => {
        const chosenOption = {
            chosenOption: optionIndex
        }
        service.createResponse('my', pollId, chosenOption)
            .then(findAllPolls).then(recordResponse)
    }

    const findIfUserAlreadyRespondedToPoll = (pollId,userId) => {
        let temp = {}
        service.findPollResponseByPollIdAndUserId(pollId,userId)
            .then(response => {
                console.log("The response is "+JSON.stringify(response))
                if (response) {
                    setIsResponded(true)
                    setPollResponse(response.chosenOption)
                }
            })
    }

    useEffect(() => {
        const calculateVotes = () => {
            service.findAllPollsResponseById(poll._id).then(data => {
                console.log("The data is: "+JSON.stringify(data));
                return data;
            }).then((res) => {
                let data = [];
                poll.pollOptions.forEach((option,index) => {
                    let count = 0;
                    res.forEach(pollResponse => {
                        if(pollResponse.chosenOption === index) {
                            count++;
                        }
                    });
                    data.push({
                        label: option, y: count
                    });
                });
                setPieData({
                    exportEnabled: true,
                    animationEnabled: true,
                    width: "450",
                    title: {
                        text: "Distribution of votes"
                    },
                    data: [{
                        type: "pie",
                        showInLegend: true,
                        legendText: "{label}",
                        toolTipContent: "{label}: <strong>{y} votes</strong>",
                        indexLabel: "{y}",
                        indexLabelPlacement: "inside",
                        dataPoints: data
                    }]
                })
            })
        }
        calculateVotes();
        findIfUserAlreadyRespondedToPoll(poll._id,"my");
    },[Poll,show]);


    return(
        <div className="container">
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header className="text-center" closeButton>
                    <Modal.Title>{poll.pollQuestion}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { poll.pollOptions.map((option,index) =>
                        <div key={index} className={"row justify-content-center"}>
                            <button type="button" className="btn btn-outline-primary"
                                    style={{width: "300px",margin:"10px"}}>{option}</button>
                        </div>
                    )}
                    <div className="row">
                        <CanvasJSChart options={pieData}/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-danger" onClick={handleClose}>Close</button>
                </Modal.Footer>
            </Modal>


            <div className="card-group">
                <div className="col">
                    <div className="card shadow" style={{margin: "10px"}}>
                        <div className="row">
                            <div className="col-md-3 mx-auto" style={{margin:"20px"}}>
                                <img src={`../images/${poll.createdBy.username}.jpg`}
                                     alt='black' width='60' height='60'/><br/>
                                <h5><Link to={`/polls/${poll._id}`}>{poll.createdBy.username}</Link></h5>
                            </div>
                            <div className="col-md-4" style={{margin:"20px"}}>
                                {poll.pollQuestion}
                            </div>
                            <div className="col-md-2" style={{margin:"20px"}}>
                                <i onClick={() => deletePoll('my', poll._id)} className="fas fa-remove fa-2x fa-pull-right"/>
                            </div>
                        </div>
                        {
                            poll.pollOptions && poll.pollOptions.map((option,index) =>
                                <div key={index} className={"row justify-content-center"}>
                                    <button type="button"
                                            className={pollResponse === index && !responseDeleted ? "btn btn-success" : "btn btn-outline-primary"}
                                            style={{width: "300px", margin: "10px"}}
                                            onClick={() => {
                                                if(!isClosed) {
                                                    selectOption(poll._id, index)
                                                    setPollResponse(index);
                                                    setResponseDeleted(false);
                                                }
                                            }}>
                                        {pollResponse === index && !responseDeleted ?
                                            <i className="fa fa-clipboard-check"/> : ''}
                                        {option}</button>
                                </div>)
                        }
                        <div className="row" style={{alignItems: "end" }}>
                            <div className="col-md">
                                {
                                    isClosed
                                        ? <a  className="btn btn-secondary"
                                              style={{ margin: "10px"}}>poll closed</a>
                                        : <a onClick={() => closePoll('my', poll._id).then()}

                                             tabIndex="1" className="btn btn-danger" style={{margin:"10px"}}>close poll</a>
                                }
                            </div>
                            <div className="col-md">
                                {
                                    isClosed ? <a  className="btn btn-secondary"
                                                   style={{margin:"10px"}}>Can't Remove</a>
                                        : <a onClick={deleteResponse}  className="btn btn-warning"
                                             style={{margin:"10px"}}>Remove Response</a>
                                }
                            </div>
                            <div className="d-grid gap-2 d-md-block col-md" >
                                <button type="button" style={{margin:"10px"}}
                                        onClick={handleShow}
                                        className="btn btn-primary float-end">
                                    <i className="fas fa-chart-pie fa-1x"
                                       />Details</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Poll;
