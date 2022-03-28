import React from "react";

<<<<<<< HEAD
export default class TuitStats extends React.Component {
<<<<<<< HEAD
=======
    // eslint-disable-next-line no-useless-constructor
>>>>>>> A3
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="row mt-2">
        <div className="col">
<<<<<<< HEAD
          <i className="far fa-message"></i>
          {this.props.tuit.stats.replies}
=======
const TuitStats = ({tuit, likeTuit = () => {},dislikeTuit = () => {}}) => {
    return (
      <div className="row mt-2">
        <div className="col">
          <i className="far fa-message me-1"/>
          {tuit.stats && tuit.stats.replies}
>>>>>>> A4-dislikes-feature
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
<<<<<<< HEAD
          <i className="far fa-inbox-out"></i>
=======
          <i className="far fa-message me-1"/>
          {this.props.tuit.stats && this.props.tuit.stats.replies}
        </div>
        <div className="col">
          <i className="far fa-retweet me-1"/>
          {this.props.tuit.stats && this.props.tuit.stats.retuits}
        </div>
        <div className="col">
          <i className="far fa-heart me-1"/>
          {this.props.tuit.stats && this.props.tuit.stats.likes}
        </div>
        <div className="col">
          <i className="far fa-inbox-out"/>
>>>>>>> A3
=======
          <i className="far fa-inbox-out"/>
>>>>>>> A4-dislikes-feature
        </div>
      </div>
    );
}
export default TuitStats;