import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
				<script src="/font/iconfont.js" async />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
