import React, { useState, useEffect, Fragment } from "react";
import type { FC } from "react";

import Visualization from "./Visualization";

const l = [
  {
    src: 'http://localhost:3000/mock_static/audios/daybreak.mp3',
    name: 'daybreak.mp3',
  },
  {
    src: 'http://localhost:3000/mock_static/audios/M18.mp3',
    name: 'M18.mp3',
  },
]


const Audio: FC = () => {

  const [index, setIndex] = useState<number>(0);
  const [audio, setAudio] = useState<any>(l[0]);

  useEffect(() => {
    console.log('useEffect indexs');
    console.log(audio);

    setAudio(l[index])
  }, [index])


  const onClick = () => {
    setIndex(index ? 0 : 1)
  }

  return <Fragment>
    <button onClick={onClick}>切换</button>
    <Visualization config={audio} />
  </Fragment>
}

export default Audio;
