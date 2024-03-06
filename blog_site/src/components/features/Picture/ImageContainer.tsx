/** @format */

import React, { Fragment, useState, useEffect, useContext } from "react";
import type { FC } from "react";

import { PictureContext } from "./index";

import styles from "./ImageContainer.module.scss";
import { Picture } from "@/services/API";

const LoadingImage: FC = () => {
	return <div className={styles.loader}></div>;
};

type ErrorImageProps = {
	description?: string;
};
const ErrorImage: FC<ErrorImageProps> = ({ description }) => {
	return (
		<div className={styles.container}>
			<div className={styles.error}>
				<div className={styles.number}>
					<div className={styles.four}></div>
				</div>
				<div className={styles.number}>
					<div className={styles.zero}>
						<span></span>
					</div>
				</div>
				<div className={styles.number}>
					<div className={`${styles.four} ${styles.last}`}></div>
				</div>
				{description && <p className={styles.description}>{description}</p>}
			</div>
		</div>
	);
};

type ImageProps = {
	src: string;
	alt: string;
	data: Picture;
};

const ImageContainer: FC<ImageProps> = ({ src, alt, data }) => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const pictureContext = useContext(PictureContext);

	const { setSelect, setVisiable } = pictureContext;

	useEffect(() => {
		getImage(src);
	}, [src]);

	const serPicture = () => {
		setSelect(data);
		setVisiable(true);
	};

	const getImage = async (src: string) => {
		setLoading(true);
		const image = new Image();
		image.onload = () => {
			setLoading(false);
		};
		image.onerror = () => {
			setLoading(false);
			setError(true);
		};
		image.src = src;
	};

	return (
		<Fragment>
			{loading ? (
				<LoadingImage />
			) : (
				<Fragment>
					{error ? (
						<ErrorImage description={"图片加载错误"} />
					) : (
						// eslint-disable-next-line @next/next/no-img-element
						<img
							onClick={serPicture}
							className={styles.image}
							src={src}
							alt={alt || ""}
						/>
					)}
				</Fragment>
			)}
		</Fragment>
	);
};

export default ImageContainer;
