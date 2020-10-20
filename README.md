# HTML Boilerplate

I started walking through The Odin Project's paths and found myself creating a way to many html files manually (the threshold for "way to many" being 0 here). So I decided to take some time and write a nice utility for me.

### Usage

Clone the repo and run (Maybe I publish this on npm later)

```
npm link
```

in the root folder. this will link the binary and you'll be able to use it like:

```
html-bp [path] [...options]
```

- Path will default to current working directory if not specified.

Available options are:
- --css includes a empty .css file and links it in the html
- --js includes a empty .js file and links it in the html