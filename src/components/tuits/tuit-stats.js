import React from "react";

const TuitStats = ({tuit, likeTuit = () => {},dislikeTuit = () => {}}) => {
    return (
      <div className="row mt-2">
        <div className="col">
          <i className="far fa-message me-1"/>
          {tuit.stats && tuit.stats.replies}
        </div>
        <div className="col">
          <i className="far fa-retweet me-1"/>
          {tuit.stats && tuit.stats.retuits}
        </div>
        <div className="col">
          <span onClick={() => likeTuit(tuit)}>
              {
                tuit.stats.likes > 0
                    ? <i className="fa-solid fa-thumbs-up"/>
                    : <i className="fa-regular fa-thumbs-up"/>
              }
              {/*{*/}
              {/*  tuit.stats.likes <= 0 &&*/}
              {/*    <i className="far fa-heart me-1"></i>*/}
              {/*}*/}
            {tuit.stats.likes}
          </span>
        </div>
          <div className="col">
            <span onClick={() => dislikeTuit(tuit)}>
                {
                  tuit.stats.dislikes > 0
                      ? <i className="fa-solid fa-thumbs-down"/>
                      : <i className="fa-regular fa-thumbs-down"/>
                }
                {/*{*/}
                {/*  tuit.stats.dislikes <= 0 &&*/}
                {/*    <i className="far fa-heart me-1"></i>*/}
                {/*}*/}
              {tuit.stats.dislikes}
            </span>
          </div>
        <div className="col">
          <i className="far fa-inbox-out"/>
        </div>
      </div>
    );
}
export default TuitStats;