<<<<<<< HEAD
import tuits from "./tuits-data.json";
import './tuits.css';
import Tuit from "./tuit";

function Tuits() {
 return(
<ul class="ttr-tuits list-group">
 {
   tuits.map(tuit => {
     return(
       <Tuit tuit={tuit}/>
     );
   })
 }
</ul>
    );
}
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
