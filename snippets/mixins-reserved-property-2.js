import Ember from 'ember'
import {ObjectBrowserMixin} from 'ember-frost-object-browser'

export default Ember.Controller.extend(ObjectBrowserMixin, {
  actions: {
    sortItems: function () {},
    filterItems: function () {},
    loadNext: function () {},
    loadPrevious: function () {}
  }
})
