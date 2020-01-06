# postcss-amplify

**Note:** As of 01/06/20, this plugin is still a work in progress.

[PostCSS] plugin to optimize CSS for Google AMP.

[PostCSS]: https://github.com/postcss/postcss

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

**options.excludedBlocks** (string or array) List of class blocks or prefixes to exclude.
