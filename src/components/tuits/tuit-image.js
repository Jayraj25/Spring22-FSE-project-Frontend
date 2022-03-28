<<<<<<< HEAD
<<<<<<< HEAD
=======
import React from "react";
>>>>>>> A3
=======
import React from "react";
>>>>>>> A4-dislikes-feature
const TuitImage = ({tuit}) => {
  return(
    <div className="position-relative">
      <img src={`../images/${tuit.image}`}
<<<<<<< HEAD
<<<<<<< HEAD
           className="mt-2 w-100 ttr-rounded-15px"/>
=======
           className="mt-2 w-100 ttr-rounded-15px" alt=""/>
>>>>>>> A4-dislikes-feature
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
<<<<<<< HEAD
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
=======
};
>>>>>>> A4-dislikes-feature
export default TuitImage;