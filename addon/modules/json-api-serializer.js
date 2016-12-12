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
    // this.validateConfig(this.get('config'))
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
    const pagination = this.get('page')
    if (typeof pagination === 'undefined' || pagination === true) {
      return offsetPagination
    } else {
      if (pagination === false) {
        return false
      } else {
        typeAssert(`Expected 'page strategy' to be Ember class, received ${typeOf(pagination)}`,
          pagination, 'class')
        return pagination
      }
    }
  },

  // hooks that can be overwritten
  serializeQueryParams (queryObject) {
    return queryObject
  },

  didReceiveResponse (response) {
    return response
  },

  didQuery () {

  },

  queryErrorHandler (e) {
    Ember.Logger.error('response error: ' + e)
  },

  setSortPropertyFromQueryParam (controller) {
    const filterQueryParam = controller.get('filterQueryParam')
    controller.set('facetsConfig.value', filterQueryParam)
  },

  setFilterPropertyFromQueryParam (controller) {
    let sortQueryParam = controller.get('sortQueryParam')

    typeAssert(`Expected 'sortQueryParam' to be array, received ${typeOf(sortQueryParam)}`,
      sortQueryParam, 'array')

    let activeSorting = sortQueryParam.map(sortItem => {
      if (!sortItem.startsWith('-')) {
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
    controller.set('contentConfig.sorting.active', activeSorting)
  },

  query (params, context) {
    console.log(params.filterQueryParam)
    console.log(params.sortQueryParam)
    console.log(params.pageQueryParam)

    let queryObject = {
      filter: params && params.filterQueryParam,
      sort: params && params.sortQueryParam,
      page: params && params.pageQueryParam
    }

    const serializedQueryObject = this.serializeQueryParams.call(context, queryObject)
    // TODO when both sort/filter are on client and pagination is disabled, there's no need for serverQuery() call.
    if (true) {
      return this.serverQuery(serializedQueryObject, context).then(
        response => {
          // get pagination module
          context.clearListState()
          const paginationHelper = this.get('pagination')
          return paginationHelper ? paginationHelper.processPageResponse(response, context, queryObject) : response
        }
        ,
        error => {
          this.queryErrorHandler(error)
        }
      )
    } else {
      const dataKey = context.get('contentConfig.items')
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
    let promise = context.get('store').query(this.get('model'), queryObject).then(
      (response) => {
        let processedResponse = this.didReceiveResponse.call(context, response)
        let meta = response.get('meta')

        if (this.get('client.filter')) {
          processedResponse = this.clientFilter(processedResponse, Ember.get(queryObject, 'filter'), context)
        }
        if (this.get('client.sort') && queryObject.sort.length > 0) {
          processedResponse = this.clientSort(processedResponse, Ember.get(queryObject, 'sort'), context)
        }
        Ember.set(processedResponse, 'meta', meta)
        return processedResponse
      }
    )
    this.didQuery.call(context, queryObject)
    return promise
  },

  clientFilter (items, filter, context) {
    const config = context.get('serializer.client.filter')
    typeAssert(`Expected 'serializer.client.filter' to be function, received ${typeOf(config)}`,
      config, 'function')
    return config(items, filter)
  },

  clientSort (items, sortProperties, context) {
    const config = context.get('serializer.client.sort')
    typeAssert(`Expected 'serializer.client.sort' to be function, received ${typeOf(config)}`,
      config, 'function')
    return config(items, sortProperties)
  }
})
