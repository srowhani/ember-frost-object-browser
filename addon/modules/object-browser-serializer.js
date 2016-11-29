import Ember from 'ember'
const {
  defineProperty,
  get,
  on,
  typeOf
} = Ember
import offsetPagination from './pagination/offset'
import {typeAssert} from 'ember-frost-object-browser/utils/error-handle'

export default Ember.Object.extend({
  initContext: on('init', function () {
    this.validateConfig(this.get('config'))
    const pageStrategy = this.getPageStrategy()
    defineProperty(this, 'pagination', undefined, pageStrategy)
  }),

  validateConfig (config) {
    typeAssert(`Expected 'config' to be object or Ember object instance, received ${typeOf(config)}`,
      config, ['object', 'instance'])
    const modelConfig = get(config, 'model')
    typeAssert(`Expected 'config.model' to be string, received ${typeOf(modelConfig)}`,
      modelConfig, ['string'])
    const serializerConfig = get(config, 'serializer')
    typeAssert(`Expected 'config.serializer' to be Ember class, received ${typeOf(serializerConfig)}`,
      serializerConfig, ['object', 'class'])
    const sortConfig = get(config, 'sort')
    typeAssert(`Expected 'config.sort' to be object or Ember object instance, received ${typeOf(sortConfig)}`,
      sortConfig, ['object', 'instance'])
    const filterConfig = get(config, 'filter')
    typeAssert(`Expected 'config.filter' to be object or Ember object instance, received ${typeOf(filterConfig)}`,
      filterConfig, ['object', 'instance'])
  },

  getPageStrategy () {
    const pagination = this.get('config.page')
    if (typeof pagination === 'undefined' || pagination === true) {
      return offsetPagination
    } else {
      if (pagination === false) {
        return false
      } else {
        const pageStrategy = this.get('pagination.strategy')
        typeAssert(`Expected 'page.strategy' to be Ember class, received ${typeOf(pageStrategy)}`,
          pageStrategy, 'class')
        return pageStrategy
      }
    }
  },

  normalizeFilter (filter) {
    const keys = Object.keys(filter)
    if (!Ember.isPresent(keys)) {
      return []
    }
    // get rid of extra props from bunsen component output
    let processedFilter = {}
    keys.forEach((key) => {
      processedFilter[key] = filter[key]
    })
    return processedFilter
  },

  normalizeSort (sort) {
    if (!Ember.isPresent(sort)) {
      return []
    }
    return sort.map(function (item) {
      const key = item.value
      const direction = item.direction === ':desc' ? '-' : ''
      return `${direction}${key}`
    })
  },

  normalizePage (page) {
    return page
  },

  // hooks that can be overwritten
  serializeQueryParams (queryObject) {
    return queryObject
  },

  didReceiveResponse (response) {
    return response
  },

  willQuery () {

  },

  didQuery () {

  },

  queryErrorHandler (e) {
    Ember.Logger.error('response error: ' + e)
  },

  setSortPropertyFromQueryParam (controller) {
    const filterQueryParam = controller.get('filterQueryParam')
    controller.set('objectBrowserConfig.facetsConfig.value', filterQueryParam)
  },

  setFilterPropertyFromQueryParam (controller) {
    let sortQueryParam = controller.get('sortQueryParam')

    typeAssert(`Expected 'sortQueryParam' to be array, received ${typeOf(sortQueryParam)}`,
      sortQueryParam, 'array')

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
    // TODO when both sort/filter are on client and pagination is disabled, there's no need for serverQuery() call.
    if (true) {
      return this.serverQuery(serializedQueryObject, context).then(
        response => {
          // get pagination module
          this.get('context').clearListState()
          const paginationHelper = this.get('pagination')
          return paginationHelper ? paginationHelper.processPageResponse(response, context, queryObject) : response
        },
        error => {
          this.queryErrorHandler(error)
        })
    } else {
      const dataKey = context.get('objectBrowserConfig.listConfig.items')
      let result = context.get(dataKey)
      if (this.get('config.filter.client')) {
        result = this.clientFilter(result, get(queryObject, 'filter'))
      }
      if (this.get('config.sort.client')) {
        result = this.clientSort(result, get(queryObject, 'sort'))
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
          processedResponse = this.clientFilter(processedResponse, Ember.get(queryObject, 'filter'))
        }
        if (this.get('config.sort.client') && queryObject.sort.length > 0) {
          processedResponse = this.clientSort(processedResponse, Ember.get(queryObject, 'sort'))
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
   }
   */
  clientFilter (items, filter) {
    const context = this.get('context')
    const config = context.get('objectBrowserConfig.serializerConfig.filter.client')

    typeAssert(`Expected 'serializerConfig.filter.client' to be function or boolean, received ${typeOf(config)}`,
      config, ['function', 'boolean'])

    if (typeof config === 'function') {
      console.log('run custom client filter')
      return config(items, filter)
    } else {
      console.log('run default client filter')
      return context.objectBrowserDefaultFilter(items, filter)
    }
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

    typeAssert(`Expected 'serializerConfig.sort.client' to be function or boolean, received ${typeOf(config)}`,
      config, ['function', 'boolean'])

    if (typeof config === 'function') {
      console.log('run custom client sort')
      return config(items, sortProperties)
    } else {
      console.log('run default client sort')
      return context.objectBrowserDefaultSort(items, sortProperties)
    }
  }
})
