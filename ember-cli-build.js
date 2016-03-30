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
    }
  })

  if (app.env === 'development') {
    app.import('bower_components/ember-renderspeed/ember-renderspeed.js')
  }

  if (app.env === 'test') {
    app.import('bower_components/sinon-chai/lib/sinon-chai.js', {type: 'test'})
  }

  return app.toTree()
}
