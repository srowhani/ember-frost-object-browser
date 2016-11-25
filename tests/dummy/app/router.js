import Ember from 'ember'
import config from './config/environment'

var Router = Ember.Router.extend({
  location: config.locationType
})

Router.map(function () {
  this.route('docs', function () {
    this.route('getting-started', function () {
      this.route('overview')
      this.route('installation')
    })

    this.route('api-details', function () {
      this.route('data-drive')
      this.route('full-access')
    })
    this.route('mixins', function () {
      this.route('how-to-use')
      this.route('how-to-config')
      this.route('hooks')
      this.route('reserved-property')
    })
    this.route('data-serializers', function () {
      this.route('overview')
      this.route('how-to-config')
    })
  })
  this.route('lts-qp')
  this.route('test')
})

export default Router
