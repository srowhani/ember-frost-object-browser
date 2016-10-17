import Ember from 'ember'
const {on} = Ember

export default Ember.Object.extend({

  // normalization methods
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

    return sort.map(function (item) {
      let key = item.value
      let direction = item.direction === ':desc' ? '-' : ''
      return `${direction}${key}`
    })
  },

  // TODO not support yet
  normalizePage: function () {

  },


  // hooks that can be overwritten
  serializeQueryParams: function (queryObject) {
    return queryObject
  },

  didReceiveResponse: function (response) {
    return response
  },

  willQuery: function () {

  },

  didQuery: function () {

  },


  // query related
  query(params) {
    const context = this.get('context')

    console.log(params.filterQueryParam)
    console.log(params.sortQueryParam)
    console.log(params && params.page)

    let queryObject = {
      filter: params && params.filterQueryParam,
      sort: params && params.sortQueryParam,
      page: params && params.page
    }

    const serializedQueryObject = this.serializeQueryParams(queryObject)
    this.willQuery()
    if (true) {
      return this.serverQuery(serializedQueryObject, context)
    } else {
      let dataKey = context.get('objectBrowserConfig.listConfig.items')
      let result = context.get(dataKey)
      if (this.get('config.filter.clientFilter')) {
        result = this.clientFilter(result, queryObject.filter)
      }
      if (this.get('config.sort.clientSort')) {
        result = this.clientSort(result, queryObject.sort)
      }
      this.didQuery()
      return Ember.RSVP.resolve(result)
    }
  },

  serverQuery(queryObject, context) {
    let promise = context.get('store').query(this.get('config.model'), queryObject).then(
      (response) => {
        let processedResponse = this.didReceiveResponse(response)

        if (this.get('config.filter.clientFilter')) {
          processedResponse = this.clientFilter(processedResponse, queryObject.filter)
        }

        if (this.get('config.sort.clientSort')) {
          processedResponse = this.clientSort(processedResponse, queryObject.sort)
        }
        return processedResponse
      }
    )
    this.didQuery()
    return promise
  },

  clientFilter(listItems, activeFacets) {
    const context = this.get('context')
    const config = context.get('objectBrowserConfig.serializerConfig.filter.clientFilter')
    if (config) {
      if(config && typeof config === 'function') {
        console.log('run custom client filter')
        return config(listItems, activeFacets)
      } else {
        console.log('run default client filter')
        return context.objectBrowserDefaultFilter(listItems, activeFacets)
      }
    }
    return listItems
  },

  clientSort(items, sortProperties) {
    const context = this.get('context')
    const config = context.get('objectBrowserConfig.serializerConfig.sort.clientSort')
    if (config) {
      if(config && typeof config === 'function') {
        console.log('run custom client sort')
        return config(items, sortProperties)
      } else {
        console.log('run default client sort')
        return context.objectBrowserDefaultSort(items, sortProperties)
      }
    }
    return items
  }
})



//!this.get('config.filter.clientFilter') ||
// !this.get('config.sort.clientSort') ||
// context.get('__meta_mixin_object_browser._state') === 'before_query'
