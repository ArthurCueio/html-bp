const path = require("path");
const fs = require("fs");
const { HTML_TEMPLATE_PATH } = require("./constants");

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

function run(args) {
  const parsedArgs = parseArgs(args);

  // Load the html template
  const template = fs.readFileSync(HTML_TEMPLATE_PATH, {encoding: 'utf8'});

  // Insert css and js links according to parsedArgs.flags
  let html = buildHtml(template, parsedArgs.flags)

  // Write  files
  try {
    fs.writeFileSync(path.join(parsedArgs.path, 'index.html'), html)

    if (parsedArgs.flags.css) {
      fs.writeFileSync(path.join(parsedArgs.path, 'styles.css'), "")
    }

    if (parsedArgs.flags.js) {
      fs.writeFileSync(path.join(parsedArgs.path, 'script.js'), "")
    }
  } catch (e) {
    if (e.code === "ENOENT") {
      console.log(`No such directory: ${parsedArgs.path}`)
      process.exit(1)
    }

    console.log(e)
  }
}

module.exports = {
  parseArgs,
  buildHtml,
  run,
};
