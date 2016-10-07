import Ember from 'ember'
import ObjectBrowserSerializer from './object-browser-serializer'

export default ObjectBrowserSerializer.extend({

  normalizeFilter: function (filter) {
    // normalize processing
    return filter
  },

  normalizeSort: function (sort) {
    if (!sort) {
      return
    }
    return sort.map(function (item) {
      return {value: item.value, direction: item.direction}
    })
  },

  normalizePage: function (page) {
    // normalize processing
    return page
  }
})
