const { parseArgs } = require("../lib");

test("Parses no args, returns default", () => {
  expect(parseArgs([""])).toEqual({ path: ".", flags: [] });
});

test("Parses a path", () => {
  expect(parseArgs(["./folder1"])).toEqual({ path: "folder1", flags: [] });
});

test("Parses flags", () => {
  expect(parseArgs(["--css", "--js"])).toEqual({
    path: ".",
    flags: ["--css", "--js"],
  });
});

test("Fails on invalid flag", () => {
  expect(() => {
    parseArgs(["-css"]);
  }).toThrow();
});

test("Parses path and flags", () => {
  expect(parseArgs(["./folder/folder2", "--js"])).toEqual({
    path: "folder/folder2",
    flags: ["--js"],
  });
});

test("Parses path and flags with weird order", () => {
  expect(parseArgs(["--css", "./folder/folder2", "--js"])).toEqual({
    path: "folder/folder2",
    flags: ["--css", "--js"],
  });
});
