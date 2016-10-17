import Ember from 'ember'
import config from './config/environment'

var Router = Ember.Router.extend({
  location: config.locationType
})

Router.map(function () {
  this.route('lts', { path: '/' })
  this.route('lts-qp')
  this.route('test')
})

export default Router
