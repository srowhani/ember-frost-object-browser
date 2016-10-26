import Ember from 'ember'
const {on} = Ember
import offsetPagination from './pagination/offset'
// import cursorPagination from './pagination/cursor'

export default Ember.Object.extend({
  initContext: on('init', function () {
    Ember.defineProperty(this, 'pagination', undefined, (function () {
      let pagination = this.get('config.page')
      if (typeof pagination === 'undefined') {
        return offsetPagination
      } else {
        return this.get('pagination.strategy')
      }
    }).call(this))
  }),

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

  normalizePage: function (page) {
    return page
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
    console.log(params.pageQueryParam)

    let queryObject = {
      filter: params && params.filterQueryParam,
      sort: params && params.sortQueryParam,
      page: params && params.pageQueryParam
    }

    const serializedQueryObject = this.serializeQueryParams(queryObject)
    this.willQuery()
    if (true) {
      return this.serverQuery(serializedQueryObject, context).then(response => {
        // get pagination module
        let paginationHelper = this.get('pagination')
        return paginationHelper ? paginationHelper.processPageResponse(response, context) : response
      })
    } else {
      let dataKey = context.get('objectBrowserConfig.listConfig.items')
      let result = context.get(dataKey)
      if (this.get('config.filter.client')) {
        result = this.clientFilter(result, queryObject.filter)
      }
      if (this.get('config.sort.client')) {
        result = this.clientSort(result, queryObject.sort)
      }
      this.didQuery()
      return Ember.RSVP.resolve(result)
    }
  },

  serverQuery(queryObject, context) {
    let promise = context.get('store').query(this.get('config.model'), queryObject).then(
      (response) => {
        let meta = response.get('meta')

        let processedResponse = this.didReceiveResponse(response)

        if (this.get('config.filter.client')) {
          processedResponse = this.clientFilter(processedResponse, queryObject.filter)
        }

        if (this.get('config.sort.client')) {
          processedResponse = this.clientSort(processedResponse, queryObject.sort)
        }

        Ember.set(processedResponse, 'meta', meta)
        return processedResponse
      }
    )
    this.didQuery()
    return promise
  },

  clientFilter(listItems, activeFacets) {
    const context = this.get('context')
    const config = context.get('objectBrowserConfig.serializerConfig.filter.client')
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
    const config = context.get('objectBrowserConfig.serializerConfig.sort.client')
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
