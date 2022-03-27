import React from "react";

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
        </div>
        <div className="col">
          <i className="far fa-retweet"></i>
          {this.props.tuit.stats.retuits}
        </div>
        <div className="col">
          <i className="far fa-heart"></i>
          {this.props.tuit.stats.likes}
        </div>
        <div className="col">
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
        </div>
      </div>
    );
  }
}