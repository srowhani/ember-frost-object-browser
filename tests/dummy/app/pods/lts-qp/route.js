import Ember from 'ember'
import dummyData from '../mocks/dummyInput'
import RouteMixin from 'ember-frost-object-browser/mixins/object-browser-route-mixin'

export default Ember.Route.extend(RouteMixin, {

  model: function (params) {
    return this._super(params).then((response) => {
      return {
        resources: response
      }
    })
  }
})
