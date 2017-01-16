import Ember from 'ember'
import config from './config/environment'

var Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
})

Router.map(function () {
  this.route('client')
  this.route('server', { path: '/' })

  this.route('demo', function () {
    this.route('client')
    this.route('server')
  })
  this.route('user', { path: '/user/:id' })
})

export default Router
