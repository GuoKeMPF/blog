import React, { Fragment, useState, useEffect } from "react";
import type { FC } from "react";

import { useIntl } from "umi";

import styles from "./ImageContainer.less";


const LoadingImage: FC = () => {
  return <div className={styles.loader}></div>
}

type ErrorImageProps = {
  description?: string
}
const ErrorImage: FC<ErrorImageProps> = ({ description }) => {

  return <div className={styles.numbers}>
    <div className={styles.number}>
      <div className={styles.four}></div>
    </div>
    <div className={styles.number}>
      <div className={styles.zero}><span></span></div>
    </div>
    <div className={styles.number}>
      <div className={`${styles.four} ${styles.last}`}></div>
    </div>
    {description && <p className={styles.description}>{description}</p>}
  </div>
}


type ImageProps = {
  src: string;
  alt: string
}

const ImageContainer: FC<ImageProps> = ({ src, alt }) => {

  const intl = useIntl();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getImage(src);
  }, [src]);

  const getImage = async (src: string) => {
    setLoading(true);
    const image = new Image();
    image.onload = () => {
      console.log('onloadeddata');
      setLoading(false);
    }
    image.onerror = () => {
      setLoading(false);
      setError(true);
    }
    image.src = src;
  }




  return <Fragment>
    {
      loading ? <LoadingImage /> : <Fragment>
        {
          error ? <ErrorImage description={
            intl.formatMessage({
              id: 'error_image',
              defaultMessage: '图片加载错误',
            })
          } /> :
            <img src={src} alt={alt} />
        }
      </Fragment>
    }
  </Fragment>;
}


export default ImageContainer
