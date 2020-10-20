#!/usr/bin/env node
const path = require("path");
const fs = require("fs");

// Get args
const [, , ...args] = process.argv;

// Parse args
// Possible args are
// path: The path to which the template should be copied. Defaults to "./index.html"(args[0])
let destinationFolder = path.resolve(".");
let destIncludesFileName = false;

if (args[0]) {
  destinationFolder = path.resolve(args[0]);
  destIncludesFileName = args[0].match(/.html$/) !== null;
}

const destinationPath = path.join(
  destinationFolder,
  destIncludesFileName ? "" : "index.html"
);

// Copy the file to destination
const templatePath = path.join(__dirname, "template", "index.html");

try {
  fs.copyFileSync(templatePath, destinationPath);
  console.log("Files copied. :)");
} catch (e) {
  let message = e.toString();
  if (e.code === "ENOENT") {
    message = "Error copying files: No such file or directory";
  }

  console.log(message);
  process.exit(1);
}

// Exit
process.exit();
