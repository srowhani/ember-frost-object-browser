import Ember from 'ember'
import {ObjectBrowserRouteMixin} from 'ember-frost-object-browser'

export default Ember.Route.extend(ObjectBrowserRouteMixin, {

  model: function (params) {
    return this._super(params).then((response) => {
      return {
        resources: response
      }
    })
  }

})
