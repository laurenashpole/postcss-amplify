# postcss-amplify

[PostCSS] plugin to optimize CSS for Google AMP. A web interface is available at [PostCSS Amplify].

This plugin works by filtering out:

- Media queries for desktop breakpoints
- Non `-webkit-` vendor prefixes
- Specific class block names or other prefixes (for use with BEM or other namespacing methodologies)
- `!important` flags
- `-amp` classes or `i-amp` tags

[PostCSS]: https://github.com/postcss/postcss
[PostCSS Amplify]: https://laurenashpole.github.io/postcss-amplify/

For example, inputting:

```css
body {
  font-size: 14px;
}

@media (min-width: 768px) {
  body {
    font-size: 16px;
  }
}

.heading {
  color: #000 !important;
}

.menu {
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -ms-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

.-amp-image {
  width: 300px;
}
```

would result in:

```css
body {
  font-size: 14px;
}

.heading {
  color: #000;
}

.menu {
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;
}
```

## Usage

Check your project for existing PostCSS config: `postcss.config.js`
in the project root, `"postcss"` section in `package.json`
or `postcss` in bundle config.

If you already use PostCSS, add the plugin to plugins list:

```diff
module.exports = {
  plugins: [
+   require('postcss-amplify')(options),
    require('autoprefixer')
  ]
}
```

If you do not use PostCSS, add it according to [official docs]
and set this plugin in settings.

[official docs]: https://github.com/postcss/postcss#usage

## Options

**options.maxBreakpoint** (string) To allow for larger mobile styling, media queries below this breakpoint will be preserved.

**options.excludedBlocks** (string or array) List of class block names or prefixes to exclude. Do not include the `.` at the beginning of the name.

## Issues

If you run into any unintended side effects or other bugs, please submit an [issue].

[issue]: https://github.com/laurenashpole/postcss-amplify/issues

## License

[MIT]

[MIT]: https://github.com/laurenashpole/postcss-amplify/blob/master/LICENSE