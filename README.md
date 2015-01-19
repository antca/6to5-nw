# 6to5-nw

A module to develop node-webkit applications with ES6 easily.

## Installation
As any dependencies of your node-webkit app, just run :

    npm install 6to5-nw --save

## Usage

In your index.html file, you can add a script which call the module

#### require('6to5-nw')(entryScript, options);

`entryScript` is the entry point of your application.

`options` is en object composed by up to 3 items:
  - `browserify` : browserify options object.
  - `to5` : 6to5 options object.
  - `watch` : `true` or `false` depending if you want the application to reload when you save a (client) script or not.

## Example

```html
<script>
  require('6to5-nw')('./index', {
  	browserify: {
  		debug: true
  	},
  	to5: {
  		sourceMap: 'inline'
  	},
  	watch: true
  });
</script>
```

## Polyfill

6to5 provide ES6 polyfills from external projects (core.js and regenerator), you can apply them simply by adding the `import "6to5/polyfill"` statement. Note that because the core.js polyfill replace the console module, you may loose source-maps information in devtools's console.

## Production

When you are ready to ship the program, you can simply run ugifyjs on the bundle, and replace the old script tag with the minified bundle.
