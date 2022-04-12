import React, { useContext } from "react";

import type { FC } from "react";

import { PictureContext } from "./index";

import styles from "./ImageModal.less";

const ImageModal: FC = () => {
  const pictureContext = useContext(PictureContext);

  const { setSelect, setVisiable, visiable, select } = pictureContext

  const clickMask = () => {
    setVisiable(false);
    setSelect(undefined);
  }


  return <div
    className={`${styles.imageModal} ${visiable ? styles.show : styles.hide}`}
    onClick={clickMask}
  >
    <img className={styles.images} src={select?.src} alt={select?.name} />
  </div>
}

export default ImageModal
