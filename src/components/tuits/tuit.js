<<<<<<< HEAD
=======
import React from "react";
>>>>>>> A3
import TuitStats from "./tuit-stats";
import TuitImage from "./tuit-image";
import TuitVideo from "./tuit-video";

<<<<<<< HEAD
const Tuit = ({tuit}) => {
  return(
    <li className="p-2 ttr-tuit list-group-item d-flex rounded-0">
      <div className="pe-2">
        <img src={`../images/${tuit['avatar-logo']}`}
             className="ttr-tuit-avatar-logo rounded-circle"/>
      </div>
      <div>
        <h2
          className="fs-5">{tuit.username} @{tuit.handle} - {tuit.published}</h2>
        {tuit.content}
=======
const Tuit = ({tuit, deleteTuit}) => {
  return(
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
        <h2
          className="fs-5">
          {tuit.createdBy && tuit.createdBy.username}
            @{tuit.createdBy && tuit.createdBy.username} -
            {tuit.postedOn}</h2>
        {tuit.tuit}
>>>>>>> A3
        {
          tuit.youtube &&
            <TuitVideo tuit={tuit}/>
        }
        {
          tuit.image &&
          <TuitImage tuit={tuit}/>
        }
        <TuitStats tuit={tuit}/>
      </div>
    </li>
  );
}
export default Tuit;