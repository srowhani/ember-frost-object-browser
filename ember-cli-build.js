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
        'node_modules/ember-frost-css-core/scss',
        'node_modules/ember-frost-theme/scss'
      ]
    }
  })

  if (app.env === 'development') {
    app.import('bower_components/ember-renderspeed/ember-renderspeed.js')
  }

  if (app.env === 'test') {
    app.import('bower_components/sinonRowSelectchai/lib/sinonRowSelectchai.js', {type: 'test'})
  }

  return app.toTree()
}
