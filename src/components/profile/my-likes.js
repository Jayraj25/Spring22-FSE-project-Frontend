/**
 * @file renders the user's likes screen
 */
import Tuits from "../tuits";
import * as service from "../../services/likes-service";
import {useEffect, useState} from "react";

/**
 * @function MyLikes
 * @returns {JSX.Element}  - renders the user's likes screen
 * @constructor MyLikes
 */
const MyLikes = () => {
    const [likedTuits, setLikedTuits] = useState([]);
    const findTuitsILike = () =>
        service.findAllTuitsLikedByUser("me")
            .then((tuits) => setLikedTuits(tuits));
    useEffect(findTuitsILike, []);
    
    return(
        <div>
            <Tuits tuits={likedTuits} refreshTuits={findTuitsILike}/>
        </div>
    );
};
export default MyLikes;