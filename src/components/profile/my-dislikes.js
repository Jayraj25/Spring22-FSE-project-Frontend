/**
 * @file renders the dislikes screen of the user profile
 */
import {useEffect, useState} from "react";
import * as service from "../../services/dislikes-service";
import Tuits from "../tuits";

/**
 * @function MyDislikes
 * @returns {JSX.Element} - the dislikes screen of the user profile
 * @constructor - MyDislikes
 */
const MyDislikes = () => {
    const [dislikedTuit, setDislikedTuit] = useState([]);
    const findTuitsIDislike = () =>
        service.findAllTuitsDislikedByUser("me")
            .then(tuits => setDislikedTuit(tuits));
    useEffect(findTuitsIDislike, []);

    return(
        <div>
            <Tuits tuits={dislikedTuit} refreshTuits={findTuitsIDislike}/>
        </div>
    );
};
export default MyDislikes;