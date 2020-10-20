const { buildHtml } = require("../lib");

const TEST_HTML_1 = `<html>
  <head>
    <!--cssLink-->
  </head>
  <body>
    <!--jsLink-->
  </body>
</html>`;

test("Builds html with no css or js", () => {
  const expected = `<html>
  <head>
  </head>
  <body>
  </body>
</html>`;
  expect(buildHtml(TEST_HTML_1)).toEqual(expected);
});

test("Builds with css", () => {
  const expected = `<html>
  <head>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
  </body>
</html>`;
  expect(buildHtml(TEST_HTML_1, { css: true })).toEqual(expected);
});

test("Builds with js", () => {
  const expected = `<html>
  <head>
  </head>
  <body>
    <script src="script.js"></script>
  </body>
</html>`;
  expect(buildHtml(TEST_HTML_1, { js: true })).toEqual(expected);
});

test("Builds with js and css", () => {
  const expected = `<html>
  <head>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <script src="script.js"></script>
  </body>
</html>`;
  expect(buildHtml(TEST_HTML_1, { css: true, js: true })).toEqual(expected);
});
