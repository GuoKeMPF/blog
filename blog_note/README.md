# Dumi

Framework:dumi <a href="[example.com](https://d.umijs.org/)" target="_blank">https://d.umijs.org/</a>

github pages: <a href="https://guokempf.github.io/note/" target="_blank">https://guokempf.github.io/note/</a>

## 打包文挡

```sh
npm run docs:build
```




npm error with node version 16+

```log
node:internal/crypto/hash:71
  this[kHandle] = new _Hash(algorithm, xofLen);
                  ^

Error: error:0308010C:digital envelope routines::unsupported
    at new Hash (node:internal/crypto/hash:71:19)
    at Object.createHash (node:crypto:133:10)
    at BulkUpdateDecorator.hashFactory (D:\Codes\blog\blog_site\node_modules\@umijs\deps\compiled\webpack\5\bundle5.js:184154:18)
    at BulkUpdateDecorator.digest (D:\Codes\blog\blog_site\node_modules\@umijs\deps\compiled\webpack\5\bundle5.js:184089:21)
    at NormalModule._initBuildHash (D:\Codes\blog\blog_site\node_modules\@umijs\deps\compiled\webpack\5\bundle5.js:115965:53)
    at D:\Codes\blog\blog_site\node_modules\@umijs\deps\compiled\webpack\5\bundle5.js:116005:10
    at processResult (D:\Codes\blog\blog_site\node_modules\@umijs\deps\compiled\webpack\5\bundle5.js:115801:12)
    at D:\Codes\blog\blog_site\node_modules\@umijs\deps\compiled\webpack\5\bundle5.js:115900:5
    at D:\Codes\blog\blog_site\node_modules\@umijs\deps\compiled\webpack\5\bundle5.js:35125:11
    at D:\Codes\blog\blog_site\node_modules\@umijs\deps\compiled\webpack\5\bundle5.js:34977:18
    at context.callback (D:\Codes\blog\blog_site\node_modules\@umijs\deps\compiled\webpack\5\bundle5.js:34850:13)
    at D:\Codes\blog\blog_site\node_modules\@umijs\deps\compiled\babel-loader\index.js:1:130029 {
  opensslErrorStack: [ 'error:03000086:digital envelope routines::initialization error' ],
  library: 'digital envelope routines',
  reason: 'unsupported',
  code: 'ERR_OSSL_EVP_UNSUPPORTED'
}

Node.js v18.8.0
```

solution

windows
```cmd
set NODE_OPTIONS=--openssl-legacy-provider
```

linux or mac os

```bash
export NODE_OPTIONS=--openssl-legacy-provider
```

