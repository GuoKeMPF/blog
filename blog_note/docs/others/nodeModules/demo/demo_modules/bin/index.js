#!/usr/bin/env node

const argv = process.argv;

function start() {
    console.log('demo script');
    console.log('argv instanceof Array', argv instanceof Array);
    console.log('type of argv', typeof (argv));
    console.log(argv);
}

start()

