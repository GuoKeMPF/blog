#!/usr/bin/env node
"use strict";

const argv = process.argv;
function start() {
  console.log('demo script');
  console.log('argv instanceof Array', argv instanceof Array);
  console.log('type of argv', typeof argv);
  console.log(argv);
}
start();