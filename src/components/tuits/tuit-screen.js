/**
 * @file renders the tuit screen component
 */
import React, {useEffect, useState} from "react";
import * as service from "../../services/tuits-service"
import {useParams} from "react-router-dom";
import Tuit from "./tuit";

/**
 * @typedef {Object} TuitScreenProps
 * @returns {JSX.Element} TuitScreen
 * @constructor TuitScreen
 */
const TuitScreen = () => {
    const [tuit, setTuit] = useState({});
    const {tid} = useParams();
    const findTuitById = () =>
        service.findTuitById(tid)
            .then(tuit => setTuit(tuit));
    useEffect(findTuitById, []);
    return(
        <div>
            <Tuit tuit={tuit} likeTuit={() => {}}/>
        </div>
    );
};
export default TuitScreen;