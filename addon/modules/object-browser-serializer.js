import Ember from 'ember'
const {on} = Ember
import offsetPagination from './pagination/offset'

export default Ember.Object.extend({
  initContext: on('init', function () {
    /* eslint-disable */
    Ember.defineProperty(this, 'pagination', undefined, (function () {
      let pagination = this.get('config.page')
      if (typeof pagination === 'undefined') {
        return offsetPagination
      } else {
        return this.get('pagination.strategy')
      }
    }).call(this))
    /* eslint-enable */
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

  queryErrorHandler: function (e) {
    Ember.Logger.error('response error: ' + e)
  },

  setSortPropertyFromQueryParam (controller) {
    const filterQueryParam = controller.get('filterQueryParam')
    controller.set('objectBrowserConfig.facetsConfig.value', filterQueryParam)
  },

  setFilterPropertyFromQueryParam (controller) {
    let sortQueryParam = controller.get('sortQueryParam')
    if (!Array.isArray(sortQueryParam)) {
      return
    }
    let activeSorting = sortQueryParam.map(sortItem => {
      if (sortItem.indexOf('-') === -1) {
        return {
          value: sortItem,
          direction: ':asc'
        }
      } else {
        return {
          value: sortItem.slice(1),
          direction: ':desc'
        }
      }
    })
    controller.set('objectBrowserConfig.listConfig.sorting.active', activeSorting)
  },

  query (params) {
    const context = this.get('context')
    console.log(params.filterQueryParam)
    console.log(params.sortQueryParam)
    console.log(params.pageQueryParam)

    let queryObject = {
      filter: params && params.filterQueryParam,
      sort: params && params.sortQueryParam,
      page: params && params.pageQueryParam
    }

    const serializedQueryObject = this.serializeQueryParams.call(context, queryObject)
    this.willQuery.call(context, serializedQueryObject)
    if (true) {
      return this.serverQuery(serializedQueryObject, context).then(
        response => {
          // get pagination module
          this.get('context').clearListState()
          let paginationHelper = this.get('pagination')
          return paginationHelper ? paginationHelper.processPageResponse(response, context, queryObject) : response
        },
        error => {
          this.queryErrorHandler(error)
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
      this.didQuery.call(context, serializedQueryObject)
      return Ember.RSVP.resolve(result)
    }
  },

  serverQuery (queryObject, context) {
    let promise = context.get('store').query(this.get('config.model'), queryObject).then(
      (response) => {
        let processedResponse = this.didReceiveResponse.call(context, response)

        let meta = response.get('meta')

        if (this.get('config.filter.client')) {
          processedResponse = this.clientFilter(processedResponse, queryObject.filter)
        }
        if (this.get('config.sort.client') && queryObject.sort.length > 0) {
          processedResponse = this.clientSort(processedResponse, queryObject.sort)
        }

        Ember.set(processedResponse, 'meta', meta)
        return processedResponse
      }
    )
    this.didQuery.call(context, queryObject)
    return promise
  },

  /*
   Function runs when
   filter: {
     client: true / client: <function>
   },
   */
  clientFilter (items, filter) {
    const context = this.get('context')
    const config = context.get('objectBrowserConfig.serializerConfig.filter.client')
    if (config) {
      if (config && typeof config === 'function') {
        console.log('run custom client filter')
        return config(items, filter)
      } else {
        console.log('run default client filter')
        return context.objectBrowserDefaultFilter(items, filter)
      }
    }
    return items
  },

  /*
   Function runs when
   sort: {
     client: true / client: <function>
   }
   */
  clientSort (items, sortProperties) {
    const context = this.get('context')
    const config = context.get('objectBrowserConfig.serializerConfig.sort.client')
    if (config) {
      if (config && typeof config === 'function') {
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
