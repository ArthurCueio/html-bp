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

/**
 * Builds html from the template and optional options
 * @param template {string} html template
 * @param options {{css: boolean, js: boolean}} links to include
 */
function buildHtml(template, options = { css: false, js: false }) {
  let html = template.split("\n");

  const cssLink = "<!--cssLink-->";
  const jsLink = "<!--jsLink-->";

  html = html.map((line) => {
    if (options.css) {
      line = line.replace(cssLink, '<link rel="stylesheet" href="styles.css">');
    } else {
      line = line.replace(cssLink, "");
    }

    if (options.js) {
      line = line.replace(jsLink, '<script src="script.js"></script>');
    } else {
      line = line.replace(jsLink, "");
    }

    return line;
  });

  // Remove any blank line left behind
  html = html.filter((line) => {
    return /\S/.test(line);
  });

  return html.join("\n");
}
module.exports = {
  parseArgs,
  buildHtml,
};
