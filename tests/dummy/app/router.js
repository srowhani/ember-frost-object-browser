import config from './config/environment'
import Ember from 'ember'
const {Router: EmberRouter} = Ember

var Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
})

Router.map(function () {
  this.route('client')
  this.route('server', {path: '/'})

  this.route('demo', function () {
    this.route('client')
    this.route('server')
  })
  this.route('user', {path: '/user/:id'})
})

export default Router
