<<<<<<< HEAD
<<<<<<< HEAD
import tuits from "./tuits-data.json";
=======
import React from "react";
>>>>>>> A4-dislikes-feature
import './tuits.css';
import Tuit from "./tuit";
import * as likesService from "../../services/likes-service";
import * as dislikesService from "../../services/dislikes-service";
import * as service from "../../services/tuits-service";
const Tuits = ({tuits = [], refreshTuits}) => {
    const likeTuit = (tuit) => {
        likesService.userLikesTuit("me", tuit._id)
            .then(refreshTuits)
            .catch(e => alert(e))
    }

    const dislikeTuit = (tuit) => {
        dislikesService.userDislikesTuit("me", tuit._id)
            .then(refreshTuits)
            .catch(e => alert(e))
    }
    const deleteTuit = (tid) =>
        service.deleteTuit(tid)
            .then(refreshTuits);

    return (
        <div>
          <ul className="ttr-tuits list-group">
            {
              tuits.map && tuits.map(tuit =>
                  <Tuit key={tuit._id}
                        deleteTuit={deleteTuit}
                        likeTuit={likeTuit}
                        dislikeTuit={dislikeTuit}
                        tuit={tuit}/>)
            }
          </ul>
        </div>
      );
}
<<<<<<< HEAD
export default Tuits;
=======
import React from "react";
import './tuits.css';
import Tuit from "./tuit";

function TuitsList({tuits = [], deleteTuit}) {
    return (
    <div>
      <ul className="ttr-tuits list-group">
        {
          tuits.map && tuits.map(tuit => {
            return (
              <Tuit key={tuit._id} deleteTuit={deleteTuit} tuit={tuit}/>
            );
          })
        }
      </ul>
    </div>
  );
}

export default TuitsList;
>>>>>>> A3
=======

export default Tuits;
>>>>>>> A4-dislikes-feature
