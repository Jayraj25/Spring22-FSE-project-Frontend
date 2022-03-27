<<<<<<< HEAD
=======
import React from "react";
>>>>>>> A3
const TuitImage = ({tuit}) => {
  return(
    <div className="position-relative">
      <img src={`../images/${tuit.image}`}
<<<<<<< HEAD
           className="mt-2 w-100 ttr-rounded-15px"/>
      {
        tuit['image-overlay'] &&
        <span
          className="fa-2x text-white fw-bold bottom-0 ttr-tuit-image-overlay position-absolute">
                      {tuit['image-overlay']}
                  </span>
      }
    </div>
  );
}
=======
           className="mt-2 w-100 ttr-rounded-15px" alt=""/>
      {
        tuit.imageOverlay &&
        <span
          className={`fa-2x text-white fw-bold bottom-0
                      ttr-tuit-image-overlay position-absolute`}>
          {tuit.imageOverlay}
        </span>
      }
    </div>
  );
};
>>>>>>> A3
export default TuitImage;