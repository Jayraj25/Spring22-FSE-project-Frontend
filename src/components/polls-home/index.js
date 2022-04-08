/**
 * @file renders the home page for polls
 */
import React from "react";
import Tuits from "../tuits";
import * as service from "../../services/polls-service";
import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";

/**
 * @function Poll
 * @returns {JSX.Element} - the home page for polls
 * @constructor Poll
 */
const PollHome = () => {
    const location = useLocation();
    const {uid} = useParams();
    const [polls, setPolls] = useState([]);
    const [poll, setPoll] = useState('');
    const userId = uid;
    const findPolls = () =>
        service.findAllPolls()
            .then(polls => setPolls(polls));
    useEffect(() => {
        let isMounted = true;
        const x = findPolls()
        return () => {isMounted = false;}
    }, []);
    const createPoll = () =>
        service.createPoll('my', {poll})
            .then(findPolls)
    return(
        <div className="ttr-home">
            <div className="border border-bottom-0">
                <h4 className="fw-bold p-2">Poll Screen</h4>
                <div className="d-flex">
                    <div className="p-2">
                        <img className="ttr-width-50px rounded-circle"
                             src={`../images/nasa-logo.jpg`} alt=""/>
                    </div>
                    <div className="p-2 w-100">
            <textarea
                onChange={(e) =>
                    setPoll(e.target.value)}
                placeholder="What's happening?"
                className="w-100 border-0"></textarea>
                        <div className="row">
                            <div className="col-10 ttr-font-size-150pc text-primary">
                                <i className="fas fa-portrait me-3"/>
                                <i className="far fa-gif me-3"/>
                                <i className="far fa-bar-chart me-3"/>
                                <i className="far fa-face-smile me-3"/>
                                <i className="far fa-calendar me-3"/>
                                <i className="far fa-map-location me-3"/>
                            </div>
                            <div className="col-2">
                                <a onClick={createPoll}
                                   className={`btn btn-primary rounded-pill fa-pull-right
                                fw-bold ps-4 pe-4`}>
                                    Poll
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Polls polls={polls}
                   refreshPolls={findPolls}/>
        </div>
    );
};
export default PollHome;
