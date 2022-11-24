---
title: 关于 npm 依赖包
toc: menu
---

# 关于 npm 依赖包

1. 首先通过 `npm init` 初始化一个项目。

2. 为了方便观察 npm 执行的流程 再 通过 `npm init` 初始化一个 npm 包 名为 demo_modules。

3. 在依赖包的 `packages.json` 中配置 `bin` ，这样 `npm i` 之后 会在 `node_modules/.bin` 中创建对应的软连接。

4. 在项目中通过 `npm i ./demo_modules` 安装本地的依赖包。

5. 在项目中配置 scripts 通过依赖包中的 bin 文件 执行依赖包中的脚本。

6. 在依赖包中 可以通过 `process.argv` 获取调用脚本的参数组成的数组。

   argv
   第一项为执行环境（node）
   第二项为执行的脚本的位置
   后面为调用脚本所用的参数 比如 `dev/start/build` `-development` 等等，各个参数之间用 空格隔开


项目中 package.json
```json
{
  "name": "demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "demo start",
    "dev": "demo dev -development"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "demo_modules": "file:demo_modules"
  }
}
```

依赖包中 package.json
```json
{
  "name": "demo_modules",
  "version": "1.0.0",
  "description": "",
  "main": "dist/index.js",
  "author": "",
  "license": "ISC",
  "bin": {
    "demo": "bin/index.js"
  }
}
```

依赖包中脚本
```js
#!/usr/bin/env node

const argv = process.argv;

function start() {
  console.log('demo script');
  console.log('argv instanceof Array', argv instanceof Array);
  console.log('type of argv', typeof argv);
  console.log(argv);
  // do something
}

start();
```
