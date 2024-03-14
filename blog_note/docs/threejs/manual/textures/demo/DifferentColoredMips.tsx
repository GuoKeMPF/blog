import React, { useRef, useEffect, type FC } from "react";

import { textureDiagrams } from "../utils";



export const DifferentColoredMips: FC = () => {
  const demoCell = useRef<HTMLDivElement>(null);

  useEffect(() => {
    textureDiagrams.differentColoredMips(demoCell.current)
  }, [])
  return <div ref={demoCell} style={{}} ></div>

};
export default DifferentColoredMips
