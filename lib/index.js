const path = require("path");

/**
 *  Possible args are:
 *  path: The path to which the template should be copied. Defaults to "./index.html"
 *  --css: Incude a css stylesheet
 *  --js: Include a javascript file
 *  @param args {string[]} args from process.argv
 *  @returns {{path: string, flags: string[]}} a object with path property and flags array
 */
function parseArgs(args) {
  const flags = [];

  args.forEach((arg) => {
    if (arg.includes("-")) {
      const match = arg.match(/--css|--js/);
      if (match) {
        flags.push(match[0]);
      } else {
        throw new Error("Invalid argument");
      }
    }
  });

  // remove flags from arg list
  flags.forEach((flag) => {
    args.splice(args.indexOf(flag), 1);
  });

  let destinationFolder = ".";

  if (args[0]) {
    destinationFolder = path.normalize(args[0]);
  }

  return { path: destinationFolder, flags };
}

module.exports = {
  parseArgs,
};
