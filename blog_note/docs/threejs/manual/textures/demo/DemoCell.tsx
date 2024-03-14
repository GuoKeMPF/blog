import React, { useRef, useEffect, type FC } from "react";

import { diagrams, threejsUtils } from "../utils";




type DemoCellProps = {
  type: string,
  [key: string]: any
};

export const DemoCell: FC<DemoCellProps> = ({ type, width = 200, height = 200, ...others }) => {
  const demoCell = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (Object.hasOwnProperty.call(diagrams, type)) {
      const config = diagrams[type]
      threejsUtils.addDiagram(demoCell.current, config)
    } else {
      console.error(`No demo for type:${type}`)
    }
  }, [])
  return <div ref={demoCell} style={{ width, height }} {...others}></div>
};

export default DemoCell
