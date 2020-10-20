#!/usr/bin/env node
const { run } = require("./lib");

// Get args
const [, , ...args] = process.argv;

run(args);
