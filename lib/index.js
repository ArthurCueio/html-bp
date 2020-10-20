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
  const flags = {};

  args = args.filter((arg) => {
    if (arg.includes("-")) {
      const match = arg.match(/--css|--js/);
      if (match) {
        const str = match[0].replace("--", "");
        flags[str] = true;
        return false;
      } else {
        throw new Error("Invalid argument");
      }
    }
    return true;
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
