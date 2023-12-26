const puppeteer = require('puppeteer');

const config = {
  headless: false,
  devtools: true,
  defaultViewport: null,
  args: ['--start-maximized'],
};

const tartget = 'https://mapanfeng.com/admin';

const requestType = ['xhr', 'fetch'];

const interceptionList = [
  {
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
