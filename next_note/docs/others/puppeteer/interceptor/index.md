---
title: interceptor 抓取指定请求并返回自定义相应
toc: menu
---

# interceptor 抓取指定请求并返回自定义相应

```javascript
const puppeteer = require('puppeteer');

// puppeteer 启动配置
const config = {
  headless: false,
  devtools: true,
  defaultViewport: null,
  args: ['--start-maximized'],
};

// 打开的网页地址
const tartget = 'https://mapanfeng.com/admin';

const requestType = ['xhr', 'fetch'];

// 监听的请求地址和需要拦截的请求数据
const interceptionList = [
  {
    // 请求地址为 https://mapanfeng.com/api/login/
    path: 'mapanfeng.com/api/login',
    response: {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      contentType: 'application/json; charset=utf-8',
      body: JSON.stringify({ data: 'user', message: 'login success' }),
    },
  },
];

async function bootstrap() {
  const browser = await puppeteer.launch(config);
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', async req => {
    const inRequestType = requestType.includes(req.resourceType());
    const inInterceptionList = interceptionList.find(item =>
      req.url().includes(item.path),
    );
    if (inRequestType && inInterceptionList) {
      await req.respond(inInterceptionList.response);
    } else {
      await req.continue();
    }
  });
  await page.goto(tartget);
}
bootstrap();
```
