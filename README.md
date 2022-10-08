# test-rollup-postcss-and-bootstrap

Repo which shows an error on `rollup-plugin-postcss` when importing `bootstrap`'s minified file, like this:

```scss
  @import '~bootstrap/dist/css/bootstrap.min.css';
```

Error disappears if we import the normal file:

```scss
  @import '~bootstrap/dist/css/bootstrap.css';
```

There are also a couple of scripts parsing same `.scss` source file, using
`postcss` API (and `node-sass` loader), which would demonstrate problem is on 
`rollup-plugin-postcss` side (probably not an error, just some missing config value).


There are three commands:

  · ```npm run postcss```: parses `src/style.scss` using just `postcss` API. It works OK.
  · ```npm run postcss_nodesass```: parses `src/style.scss` using `node-sass`loader and parsing output with `postcss` API. It works OK.
  · ```npm run rollup```: parses `src/style.scss` (through `src/index.js`) using `rollup-plugin-postcss`. It fails.

The error we can see when running `rollup-plugin-postcss` is this:

```
  Error: property "url" must be followed by a ':'
      at options.error (.../test-rollup-postcss-and-bootstrap/node_modules/node-sass/lib/index.js:290:33) {
    status: 1,
    file: '.../test-rollup-postcss-and-bootstrap/node_modules/bootstrap/dist/css/bootstrap.min.css',
    line: 6,
    column: 69384,
    formatted: `Error: property "url" must be followed by a ':'\n` +
      '        on line 6 of node_modules/bootstrap/dist/css/bootstrap.min.css\n' +
      '        from line 1 of src/style.scss\n' +
      '>> size:1.25rem;--bs-navbar-toggler-icon-bg:url("data:image/svg+xml,%3csvg x\n' +
      '   ------------------------------------------^\n',
    code: 'PLUGIN_ERROR',
    plugin: 'postcss',
    hook: 'transform',
    id: '.../test-rollup-postcss-and-bootstrap/src/style.scss',
    watchFiles: [
      '.../test-rollup-postcss-and-bootstrap/src/index.js',
      '.../test-rollup-postcss-and-bootstrap/src/style.scss'
    ]
  }
```


This is the related `css` failing (lines 3764-3780 of the unminified file, `node_modules/bootstrap/dist/css/bootstrap.css`): 

```css
.navbar {
...
  --bs-navbar-toggler-icon-bg: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%280, 0, 0, 0.55%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
```

