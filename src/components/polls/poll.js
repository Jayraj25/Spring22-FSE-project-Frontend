/**
 * @file renders a poll component
 */
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {deletePoll} from "../../services/polls-service";
import {Modal} from "react-bootstrap";
import {CanvasJSChart} from "canvasjs-react-charts";
import * as service from "../../services/polls-service";

/**
 * @component Poll component renders individual polls
 * @returns {JSX.Element} - poll component
 * @constructor poll
 */
const Poll = ({poll}) => {
    const [show, setShow] = useState(false);
    const [pieData, setPieData] = useState([]);

    const handleShow = () => {
        setShow(true);
    }
    const handleClose = () => {
        setShow(false);
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
                                    <i onClick={() => deletePoll(poll.createdBy.username, poll._id)} className="fas fa-remove fa-2x fa-pull-right"/>
                                </div>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}
export default Poll;
