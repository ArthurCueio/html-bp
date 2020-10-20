#!/usr/bin/env node
const path = require("path");
const fs = require("fs");

// Get args
const [, , ...args] = process.argv;

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
