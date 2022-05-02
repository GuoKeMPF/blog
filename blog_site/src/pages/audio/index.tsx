import React from "react";
import type { FC } from "react";

import Visualization from "./Visualization";

const Audio: FC = () => {

  return <Visualization config={{
    name:'test',
    src:'http://localhost:3000/mock_static/audios/daybreak.mp3'
  }}/>
}

export default Audio;
