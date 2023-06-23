"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
const puppeteer = require('puppeteer');
const config = {
  headless: false,
  devtools: true,
  defaultViewport: null,
  args: ['--start-maximized']
};
const tartget = 'https://mapanfeng.com/admin';
const requestType = ['xhr', 'fetch'];
const interceptionList = [{
  path: 'mapanfeng.com/api/login',
  response: {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    contentType: 'application/json; charset=utf-8',
    body: JSON.stringify({
      data: 'user',
      message: 'login success'
    })
  }
}];
function bootstrap() {
  return _bootstrap.apply(this, arguments);
}
function _bootstrap() {
  _bootstrap = _asyncToGenerator(function* () {
    const browser = yield puppeteer.launch(config);
    const page = yield browser.newPage();
    yield page.setRequestInterception(true);
    page.on('request', /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(function* (req) {
        const inRequestType = requestType.includes(req.resourceType());
        const inInterceptionList = interceptionList.find(item => req.url().includes(item.path));
        if (inRequestType && inInterceptionList) {
          yield req.respond(inInterceptionList.response);
        } else {
          yield req.continue();
        }
      });
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
    yield page.goto(tartget);
  });
  return _bootstrap.apply(this, arguments);
}
bootstrap();