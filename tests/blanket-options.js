/* globals blanket, module */

var options = {
  modulePrefix: 'ember-frost-object-browser',
  filter: '//.*ember-frost-object-browser/.*/',
  antifilter: '//.*(tests|template).*/',
  loaderExclusions: [],
  enableCoverage: true,
  cliOptions: {
    reporters: ['lcov'],
    autostart: true,
    lcovOptions: {
      outputFile: 'coverage/lcov.info',
      renamer: function (fileName) {
        return fileName.replace('ember-frost-object-browser', 'addon') + '.js'
      }
    }
  }
}

if (typeof exports === 'undefined') {
  blanket.options(options)
} else {
  module.exports = options
}
