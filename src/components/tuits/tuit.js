/**
 * @file renders a tuit component
 */
import React from "react";
import TuitStats from "./tuit-stats";
import TuitImage from "./tuit-image";
import TuitVideo from "./tuit-video";
import {useNavigate, Link, Routes, Route} from "react-router-dom";
import MyTuits from "../profile/my-tuits";
import TuitsAndReplies from "../profile/tuits-and-replies";
import Media from "../profile/media";
import MyLikes from "../profile/my-likes";
import MyDislikes from "../profile/my-dislikes";

/**
 * @component Tuit component renders individual tuits
 * @param tuit - tuit object
 * @param deleteTuit - function to delete a tuit
 * @param likeTuit - function to like a tuit
 * @param dislikeTuit - function to dislike a tuit
 * @returns {JSX.Element} - tuit component
 * @constructor Tuit
 */
const Tuit = ({tuit, deleteTuit, likeTuit, dislikeTuit}) => {
    // console.log("tuit" + tuit.createdBy.username);
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
                    tuit.createdBy &&
                    <img src={`../images/${tuit.createdBy.username}.jpg`}
                         className="ttr-tuit-avatar-logo rounded-circle" alt=""/>
                }
            </div>
            <div className="w-100">
                <i onClick={() => deleteTuit(tuit._id)} className="fas fa-remove fa-2x fa-pull-right"/>
                <Link to={`/tuit/${tuit._id}`}>
                    <i className="float-end fas fa-circle-ellipsis me-1"/>
                </Link>
                <h2
                    className="fs-5">
                    {tuit.createdBy.username}@{tuit.createdBy.username} -
                    <span className="ms-1">{daysOld(tuit)}</span></h2>
                {tuit.tuit}
                {
                    tuit.youtube &&
                    <TuitVideo tuit={tuit}/>
                }
                {
                    tuit.image &&
                    <TuitImage tuit={tuit}/>
                }
                <TuitStats tuit={tuit} likeTuit={likeTuit} dislikeTuit={dislikeTuit}/>
            </div>
        </li>

    );
}
export default Tuit;