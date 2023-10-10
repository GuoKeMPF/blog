import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/docs", component: "docs" },
  ],

  plugins: ["@umijs/plugins/dist/dva", "@umijs/plugins/dist/locale"],
  locale: {
    default: "zh-CN",
    title: false,
    // localStorage 中 umi_locale 值 > 浏览器检测 > default 设置的默认语言 > 中文
    baseNavigator: true,
    baseSeparator: "-",
  },
  ssr: {
    builder: "esbuild",
  },
  dva: {
    immer: {
      enableES5: true,
      enableAllPlugins: true,
    },
  },
  npmClient: "yarn",
});
