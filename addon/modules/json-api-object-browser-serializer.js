import Ember from 'ember'
import ObjectBrowserSerializer from './object-browser-serializer'

export default ObjectBrowserSerializer.extend({

  normalizeFilter: function (filter) {
    // normalize processing
    let keys = Object.keys(filter)
    if (!Ember.isPresent(keys)) {
      return []
    }
    // get rid of junks prop from component output
    let processedFilter = {}
    keys.forEach((key) => {
      processedFilter[key] = filter[key]
    })
    return processedFilter
  },

  normalizeSort: function (sort) {
    if (!Ember.isPresent(sort)) {
      return []
    }

    let result = sort.map(function (item) {
      let key = item.value
      let direction = item.direction === ':desc' ? '-' : ''
      return `${direction}${key}`
    })

    return result
  },

  normalizePage: function (page) {
    // normalize processing
    return page
  }
})


