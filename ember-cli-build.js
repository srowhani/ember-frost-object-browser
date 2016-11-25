/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-addon')

module.exports = function (defaults) {
  var app = new EmberApp(defaults, {
    babel: {
      optional: ['es7.decorators']
    },
    'ember-cli-mocha': {
      useLintTree: false
    },
    sassOptions: {
      includePaths: [
      ]
    },
    snippetPaths: ['snippets', 'tests/snippets']
  })

  if (app.env === 'test' || app.env === 'development') {
    app.import('bower_components/sinon-chai/lib/sinon-chai.js', {type: 'test'})
  }

  return app.toTree()
}
