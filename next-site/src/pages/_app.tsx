/** @format */

import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";

import BlankLayout from "@/layouts/BlankLayout";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	// Use the layout defined at the page level, if available
	const getLayout =
		Component.getLayout ?? ((page) => <BlankLayout>{page}</BlankLayout>);

	return getLayout(<Component {...pageProps} />);
}
