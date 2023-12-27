import React, { Fragment, useRef, useEffect } from "react";
import { useRelativePosition } from "./useRelativePosition";


export default () => {

  const container = useRef<HTMLDivElement>(null);

  const onPositionChange = (position) => {
    console.log('onPositionChange position', position);
  };

  const position = useRelativePosition({
    target: container.current,
    onChange: onPositionChange
  });


  useEffect(() => {
    console.log('useEffect container', container);
  }, [container.current]);

  useEffect(() => {
    console.log('useEffect position', position);
  }, [position]);

  return <Fragment>
    <div ref={container} style={{ width: '100%', minHeight: '300px' }}>

    </div>
  </Fragment>;
};
