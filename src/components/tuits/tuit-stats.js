import React from "react";
import {findAllTuitsLikedByUser} from "../../services/likes-service";
import {findAllTuitsDislikedByUser} from "../../services/dislikes-service";

const TuitStats = ({tuit, likeTuit = () => {},dislikeTuit = () => {}}) => {

    const [isLiked, setIsLiked] = React.useState(false);
    const [isDisliked, setIsDisliked] = React.useState(false);
    findAllTuitsLikedByUser("me")
        .then(res => setIsLiked(res.filter(t => t._id === tuit._id).length > 0));
    findAllTuitsDislikedByUser("me")
        .then(res => setIsDisliked(res.filter(t => t._id === tuit._id).length > 0));
    // console.log("isLiked by " + tuit._id + " :" + isLiked);
    // console.log("isDisliked by " + tuit._id + " :" + isDisliked);

    return (
        <div className="row mt-2">
            <div className="col">
                <span>
                    <i className="far fa-message me-1"/>
                    <span className="ttr-stats-replies">{tuit.stats && tuit.stats.replies}</span>
                </span>
            </div>
            <div className="col">
                <span>
                <i className="far fa-retweet me-1"/>
                    <span className="ttr-stats-retuits">{tuit.stats && tuit.stats.retuits}</span>
                </span>
            </div>
            <div className="col">
              <span className="ttr-like-tuit-click" onClick={() => likeTuit(tuit)}>
                  {
                      isLiked ? <i className="fa-solid fa-thumbs-up"/> : <i className="fa-regular fa-thumbs-up"/>
                  }
                  <span className="ttr-like-stats">{tuit.stats.likes}</span>
              </span>
            </div>
            <div className="col">
            <span className="ttr-dislike-tuit-click" onClick={() => dislikeTuit(tuit)}>
                {
                    isDisliked ? <i className="fa-solid fa-thumbs-down"/> : <i className="fa-regular fa-thumbs-down"/>
                }
                <span className="ttr-dislike-stats">{tuit.stats.dislikes}</span>
            </span>
            </div>
            <div className="col">
                <i className="far fa-inbox-out"/>
            </div>
        </div>
    );
}
export default TuitStats;