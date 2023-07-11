# 通用项目配置

* [git hooks](https://git-scm.com/docs/githooks)
* [husky](https://typicode.github.io/husky/#/)
* [lint-staged](https://github.com/okonet/lint-staged)
* [eslint](https://eslint.org/docs/latest/)
* [prettier](https://prettier.io/docs/en/)




通过 `git hooks` `husky` `lint-staged` 配置项目在提交时，自动执行 `eslint` `prettier` 检查/格式化代码。不符合配置规则则阻止代码提交。

## node npm 执行顺序
| 顺序 | hooks 名称  | 解释                                                                                                                     | 使用场景                                                      |
| :--- | :---------- | :----------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------ |
| 1    | preinstall  | 在安装包之前执行的钩子脚本。                                                                                             | 检查安装环境 node 版本 npm 包管理工具等                       |
| 2    | install     | 用于安装依赖包的命令。                                                                                                   |                                                               |
| 3    | postinstall | 在安装包之后执行的钩子脚本。                                                                                             | 安装某些包之后需要执行的操作                                  |
| 4    | prepublish  | 在将包发布到 npm 之前执行的钩子脚本。它在运行 npm publish 命令之前执行，可用于在发布之前进行构建、测试或其他必要的操作。 |
| 5    | preprepare  | 在执行 npm prepare 命令之前执行的钩子脚本。                                                                              | npm prepare 命令用于在将包发布到 npm 之前进行本地构建和准备。 |
| 6    | prepare     | 在执行 npm prepare 命令时执行的钩子脚本。                                                                                | npm prepare 命令用于在将包发布到 npm 之前进行本地构建和准备。 |
| 7    | postprepare | 在执行 npm prepare 命令之后执行的钩子脚本。                                                                              | npm prepare 命令用于在将包发布到 npm 之前进行本地构建和准备。 |

## git hooks

| hooks 名称  | 解释                           | 使用场景                                             |
| :---------- | :----------------------------- | :--------------------------------------------------- |
| pre-commit  | 在执行 git commit 命令之前触发 | 可以用于进行代码风格检查、静态分析、单元测试等操作。 |
| pre-push    | 在执行 git push 命令之前触发   | 可以用于运行集成测试、代码覆盖率检查等操作。         |
| post-commit | 在执行 git commit 命令之后触发 | 可以用于执行自动化部署、生成文档等操作。             |
| post-merge  | 在执行 git merge 命令之后触发  | 可以用于更新依赖重新构建项目等操作。                 |



## 配置 git hooks

通过 `husky` 自动生成 `git hooks` 命令

1. 安装 husky 并配置

```bash
npm i husky
# or
# use yarn pnpm
```

2. 配置 `postinstall` 让`npm i`执行之后自动 执行 `husky install`, `postinstall` 可换成其他钩子。

修改 package.json
```json
...
  "scripts": {
    ... // some other scripts
    "postinstall": "husky install",
    ...
  },
...
```
或者

```bash
npm pkg set scripts.postinstall="husky install" 
```
此时会在项目根目录下生成 `.husky` 文件夹并包含基本命令。

3. 通过`husky`配置`git hooks`

修改 package.json
```json
...
  "scripts": {
    ... // some other scripts
    "postinstall": "husky install",
    ...
  },
...
```
或者

```bash
npm pkg set scripts.postinstall="husky install" 
```

4. 配置`githooks`命令

修改 package.json
```json
...
  "scripts": {
    ... // some other scripts
    "prepare": "npx husky set .husky/pre-commit \"npm run lint-staged\"",
    ...
  },
...
```
或者

```bash
npm pkg set scripts.prepare="npx husky set .husky/pre-commit \"npm run lint-staged\"" 
```

此时每次安装依赖后 `.husky` 文件夹下会自动生成一个 `pre-commit` 文件，文件为 `shell`语法。内容如下

```shell

#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run lint-staged

```

其中 `npm run lint-staged` 为自己项目检查所需要的命令，可自行根据项目配置进行修改。


5. 安装 `format` `eslint` 并根据自己项目配置代码风格以及检查规则。并在`package.json`中配置执行命令。
```json
...
  "scripts": {
    ... // some other scripts
    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore",
    "format": "prettier --write src/",
    ...
  },
...
```

6. 配置 `lint-staged` 对**暂存区**的文件配置检查的方法

```json
  "lint-staged": {
    "src/**/*": [
      "npm run format",
      "npm run lint"
    ]
  },
```


`src/**/*` 为所需要检查的文件，此处表示检查 `src` 下所有的文件，如果需要对不同的文件添加不同的规则，则可根据文件类型进行匹配，配置不同的检查命令或规则。


这样配置后就会先执行`npm run format` 对代码进行代码风格格式化，再执行`npm run lint` 对代码格式进行检查。如果都通过则会执行 `git add`，否则提示代码需要修改的错误提示。
