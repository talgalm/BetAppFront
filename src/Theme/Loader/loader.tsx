import React from "react";
import Player from "lottie-react";
import Animation from "./Animation.json";

const BetLoader = () => {
  return (
    <div>
      <Player
        autoplay
        loop
        animationData={Animation} 
        style={{ height: "300px", width: "300px" }}
      />
    </div>
  );
};

export default BetLoader;