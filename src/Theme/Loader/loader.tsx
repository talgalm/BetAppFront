import React from "react";
import Player from "lottie-react";
import Animation from "./Animation.json";
import { LoaderContainer } from "./loader.styles";

const BetLoader = () => {
  return (
    <LoaderContainer>
      <Player
        autoplay
        loop
        animationData={Animation}
        style={{ height: "300px", width: "300px" }}
      />
    </LoaderContainer>
  );
};

export default BetLoader;