import styles from './index.less';
import { Button } from "antd";
import { useState, useEffect, useCallback } from "react";

import RequestAnimation from "@/utils/requestAnimation";


export default function IndexPage() {

  const [requestAnimation, setRequestAnimation] = useState<RequestAnimation | undefined>()
  const [reatio, setReatio] = useState<number>(0);

  const animate = useCallback(() => {
    setReatio((reatio)=>{
      let r = reatio >= 360 ? 1 : reatio + 1;
      return r
    })
  }, [reatio, requestAnimation]);

  useEffect(() => {
    if (animate) {
      const r = new RequestAnimation({
        callback: animate
      });
      setRequestAnimation(r)
      return () => {
        r.stop()
      }
    }
  }, [])

  const onStart = () => {
    requestAnimation?.start()
  }

  const onStop = () => {
    requestAnimation?.stop()
  }

  return (
    <div>
      <Button.Group>
        <Button onClick={onStart}>start</Button>
        <Button onClick={onStop} >stop</Button>
        <Button type='link' href={'/about'}>
          about
        </Button>
      </Button.Group>
      <div className={styles.ele}>
        <div className={styles.div} style={{ transform: `rotate(${reatio}deg)` }}>

        </div>
      </div>
    </div>
  );
}
