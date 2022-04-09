/**
 * @file renders the poll screen component
 */
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Poll from "./poll]";

/**
 * @typedef {Object} PollScreenProps
 * @returns {JSX.Element} PollScreen
 * @constructor PollScreen
 */
const PollScreen = () => {
    const [poll, setPoll] = useState({});
    const {pid} = useParams();
    // const findPollById = () =>
    //     service.findTuitById(tid)
    //         .then(tuit => setTuit(tuit));
    // useEffect(findTuitById, []);
    return(
        <div>
            <Poll poll={poll}/>
        </div>
    );
};
export default PollScreen;