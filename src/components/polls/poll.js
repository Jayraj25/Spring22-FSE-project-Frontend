/**
 * @file renders a poll component
 */
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {deletePoll} from "../../services/polls-service";
import {Modal} from "react-bootstrap";
import {CanvasJSChart} from "canvasjs-react-charts";
import {useNavigate, Link} from "react-router-dom";
import {closePoll, createResponse, deletePoll, deleteResponse, findAllPolls} from "../../services/polls-service";
import * as service from "../../services/polls-service";

/**
 * @component Poll component renders individual polls
 * @returns {JSX.Element} - poll component
 * @constructor poll
 */   
const Poll = ({poll, deletePoll}) => {
    // console.log(poll);
    const navigate = useNavigate();
    const [response, setResponse] = useState(0);
    const [responseName, setResponseName] = useState("no response");
    const [recordedResponse, setRecordedResponse] = useState("no response");
    const [closed, setClosed] = useState('close poll');
    const [show, setShow] = useState(false);
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
    const deleteResponse = () =>
        service.deleteResponse('my', poll._id).then(noResponse)
    const pollClosed = () =>
        setClosed('poll is closed')
    const closePoll = () =>
        service.closePoll('my', poll._id).then(pollClosed)

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
                        if(pollResponse.chosenOption === index+1) {
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
                        toolTipContent: "{label}: <strong>{y}%</strong>",
                        indexLabel: "{y}%",
                        indexLabelPlacement: "inside",
                        dataPoints: data
                    }]
                })
            })
        }
        calculateVotes();
    }, []);


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

                {/*<div className="card shadow md-4">*/}
                {/*    <div className="row" style={{margin:"20px"}}>*/}
                {/*        <div className="col-lg-4">*/}
                {/*            <img src={`../images/${poll.createdBy.username}.jpg`}*/}
                {/*                 className="rounded-circle" alt="Cinque" width="100" height="100"/><br/>*/}
                {/*            <h5><Link to={`/profile/my-tuits`}>{poll.createdBy.username}</Link></h5>*/}
                {/*        </div>*/}
                {/*        <div className="col-lg-8">*/}
                {/*            <div className="row"  style={{margin:"20px"}}>*/}
                {/*                <div className="col-lg-10">*/}
                {/*                {poll.pollQuestion}*/}
                {/*                </div>*/}
                {/*                <div className="col-lg-2">*/}
                {/*                    <i onClick={() => deletePoll(poll.createdBy.username, poll._id)}*/}
                {/*                       className="fas fa-remove fa-2x fa-pull-right"/>*/}
                {/*                    </div>*/}
                {/*            </div>*/}
                {/*            <div className="row">*/}
                {/*                poll.pollOptions.map((option,index) =><div key={index} className={"row justify-content-center"}>*!/*/}
                {/*                /!*                                <button type="button" className="btn btn-outline-primary"*!/*/}
                {/*                /!*                                        style={{width: "300px",margin:"10px"}}>{option}</button>*!/*/}
                {/*                /!*                            </div>*!/*/}
                {/*                /!*                        )}*!/*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}

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
                            <div style={{margin: "10px"}}>
                               your current response: {recordedResponse}
                            </div>
                            {poll.pollOptions.map((option,index) =>
                                <div key={index} className={"row justify-content-center"}>
                                    <button type="button" className="btn btn-outline-primary"
                                            style={{width: "300px",margin:"10px"}}>{option}</button>
                                </div>
                            )}
                            <div className="d-grid gap-2 d-md-block">
                                <button type="button" style={{margin:"10px"}}
                                        onClick={handleShow}
                                        className="btn btn-warning float-end">
                                    <i className="fas fa-chart-pie fa-2x"
                                       style={{marginLeft:"10px",marginRight:"10px"}}/>See Details</button>
                            <div key={index} className={"row justify-content-center"}>
                                <button  value={index} onClick={() => {setResponse(index); setResponseName(option)}} type="button" className="btn btn-outline-primary"
                                   style={{width: "300px",margin:"10px"}}>{option}</button>
                                {/*<button  value={index} onClick={() => createResponse("my", poll._id)} type="button" className="btn btn-outline-primary"*/}
                                {/*         style={{width: "300px",margin:"10px"}}>{option}</button>*/}
                            </div>
                            )}
                            <div className="row">
                                <div className="col-md-4">
                                    <a onClick={closePoll} tabIndex="1" className="btn btn-outline-primary "
                                       style={{ margin: "10px", marginTop: "33px",background: "#DB7093"}}>{closed}</a>
                                </div>
                                <div className="col-md-4">
                                    <a onClick={deleteResponse}  className="btn btn-outline-primary"
                                       style={{margin:"10px", background: "#FFD700"}}>Remove Response</a>
                                </div>
                            <div className="col-md-4">
                                <a  style={{margin:"10px"}} onClick={createResponse}
                                   className={`btn btn-primary rounded-pill
                                fw-bold ps-4 pe-4 fa-pull-right`}>
                                    submit response
                                </a>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}
export default Poll;
