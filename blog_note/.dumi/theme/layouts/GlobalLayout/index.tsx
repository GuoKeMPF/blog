import {
	createCache,
	legacyNotSelectorLinter,
	logicalPropertiesLinter,
	parentSelectorLinter,
	StyleProvider,
	extractStyle
} from '@ant-design/cssinjs';
import { ConfigProvider, theme as antdTheme } from 'antd';

// @ts-ignore
// Outlet and useServerInsertedHTML maybe export by umi, buy dumi has't export it.
import { Outlet, usePrefersColor, useServerInsertedHTML, useSiteData } from 'dumi';
import type { FC } from 'react';
import React, { useMemo } from 'react';
import Entity from '@ant-design/cssinjs/lib/Cache';
import { ThemeName } from '../../types';


const getAlgorithm = (themes: ThemeName[] = []) =>
	themes.map((theme) => {
		if (theme === 'dark') {
			return antdTheme.darkAlgorithm;
		}
		return antdTheme.defaultAlgorithm;
	});

const isThemeDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches;


const GlobalLayout: FC = () => {

	const [, theme,] = usePrefersColor();

	const { themeConfig: { ssr } } = useSiteData();

	const antdThemeMode: [ThemeName] = useMemo(() => {
		switch (theme) {
			case 'light':
				return ['light']
			case 'dark':
				return ['dark']
			case 'auto':
			default:
				return isThemeDark() ? ['dark'] : ['light']
		}
	}, [theme]);


	// @ts-ignore
	const [styleCache] = React.useState<Entity>(() => (ssr ? createCache() : [null]));

	useServerInsertedHTML(() => {
		const styleText = extractStyle(styleCache, true);
		return <style data-type="antd-cssinjs" dangerouslySetInnerHTML={{ __html: styleText }} />;
	});

	const BaseGlobalLayoutJSX = (
		<ConfigProvider
			theme={{
				algorithm: getAlgorithm(antdThemeMode)
			}}
		>
			<Outlet />
		</ConfigProvider>
	);

	const SSRGlobalLayoutJSX = (
		<StyleProvider
			cache={styleCache}
			linters={[logicalPropertiesLinter, legacyNotSelectorLinter, parentSelectorLinter]}
		>
			{BaseGlobalLayoutJSX}
		</StyleProvider>
	);
	if (ssr) {
		(global as any).styleCache = styleCache;
		return SSRGlobalLayoutJSX;
	}
	return BaseGlobalLayoutJSX;
};

export default GlobalLayout;
