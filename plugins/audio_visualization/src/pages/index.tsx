import React, { useState, useEffect, Fragment } from "react";
import { Link } from "umi";


import Visualization from "@/components/Visualization";


const l = [
  {
    src: 'http://localhost:8000/mock_static/audios/daybreak.mp3',
    name: 'daybreak.mp3',
  },
  {
    src: 'http://localhost:8000/mock_static/audios/M18.mp3',
    name: 'M18.mp3',
  },
]


const IndexPage = () => {
  const [index, setIndex] = useState<number>(0);
  const [audio, setAudio] = useState<any>(l[0]);

  useEffect(() => {
    setAudio(l[index])
  }, [index]);



  const onClick = () => {
    setIndex(index ? 0 : 1)
  }


  return (
    <div>
      <button onClick={onClick}>切换</button>
      <Link to={'/about'}>about</Link>
      <Visualization config={audio} />
    </div>
  );
}


export default IndexPage
