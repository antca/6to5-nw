var fs = require('fs');
var to5 = require('6to5');
var to5ify = require('6to5ify');
var browserify = require('browserify');
var watchify = require('watchify');
var exorcist = require('exorcist');

function run(entryFile, options) {
    var brOptions, to5Options, b;
    options = options || {};
    brOptions = options.browserify || {};
    to5Options = options.to5 || {};

    global.watchifyCache = global.watchifyCache || {};
    global.watchifyPackageCache = global.watchifyPackageCache || {};

    brOptions.cache = global.watchifyCache;
    brOptions.packageCache = global.watchifyPackageCache;
    brOptions.fullPaths = true;

    b = browserify(brOptions);
    watchify(b)
    .add(entryFile)
    .transform(to5ify.configure(to5Options))
    .on('bundle', function(bundle) {
        var stream = fs.createWriteStream('bundle.js');
        stream.on('finish', function() {
            if(options.polyfill) {
                addScript(require.resolve('6to5/browser-polyfill'));
            }
            addScript('bundle.js');
        });
        stream.write((options.polyfill ? 'require("6to5/polyfill");' : '') + 'require("6to5/register")(' + JSON.stringify(to5Options) + ');global.requireNode = window.requireNode = require;');
        bundle.pipe(exorcist('bundle.js.map')).pipe(stream);
    })
    .on('update', function() {
        if(options.watch) {
            global.window.location.reload();
        }
    })
    .on('log', function(message) {
        console.log('[watchify]', message);
    })
    .bundle();
}

function addScript(file) {
    var doc = global.window.document,
        script = doc.createElement('SCRIPT');
    script.src = file;
    doc.body.appendChild(script);
}

module.exports = run;