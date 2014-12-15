# 6to5-nw

A module to develop node-webkit applications with ES6 easily.

## Installation
As any dependencies of your node-webkit app, just run :

    npm install 6to5-nw --save

## Usage

In your index.html file, you can add a script which call the module

#### require('6to5-nw')(entryScript, options);

`entryScript` is the entry point of your application.

`options` is en object composed by up to 4 elements: 
  - `browserify` : browserify options object.
  - `to5` : 6to5 options object.
  - `polyfill` : `true` or `false` depending if you want the polyfills to be included or not.
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
  	polyfill: true,
  	watch: true
  });
</script>
```
