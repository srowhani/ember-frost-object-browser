import Ember from 'ember'
const {on} = Ember

export default Ember.Object.extend({

  //serializerConfig: {
  //  model: 'resource',
  //  sort: {
  //    clientSort: true
  //  },
  //  filter: {
  //    clientFilter: false
  //  },
  //  options: {
  //    serializer: JsonApiObjectBrowserSerializer //default
  //  }
  //}

  initSerializer: on('init', function () {

  }),

  // normalization methods
  normalizeFilter: function () {

  },

  normalizeSort: function () {

  },

  normalizePage: function () {

  },


  // hooks
  willQuery: function (queryObject) {
    return queryObject
  },

  didReceiveResponse: function (response) {
    return response
  },

  didQuery: function () {

  },

  // convenient methods
  getQueryObjectFromContext: function (context) {
    return {
      filter: context.get('cachedNormalizedFilter'),
      sort: context.get('cachedNormalizedSort'),
      page: context.get('cachedNormalizedPage')
    }
  },

  // query related
  query() {
    const context = this.get('context')
    let queryObject = this.getQueryObjectFromContext(context)

    const serializedQueryObject = this.willQuery(queryObject)

    let promise = context.get('store').query(this.get('config.model'), serializedQueryObject).then(
      (response) => {
        let processedResponse = this.didReceiveResponse(response)
        // TODO multiple object browser qp support
        let filteredResponse = this.clientFilter(processedResponse, context.get('activeFacets'))
        let sortedResponse = this.clientSort(filteredResponse, context.get('activeSorting'))

        return sortedResponse
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
    const config = this.get('objectBrowserConfig.serializerConfig.sort.clientSort')
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


// TODO remove
//query() {
//  const config = this.get('config')
//  let context = this.get('context')
//
//  if (this.get('shouldPerformServerQuery')) {
//    return this.serverQuery().then((response) => {
//
//      if(this.get('config.filter.clientFilter')) {
//      }
//      if(this.get('config.sort.clientSort')) {
//      }
//
//      return response
//    })
//  } else {
//    this.clientSort();
//    this.clientFilter();
//  }
//
//  return this.serverQuery().then((response) => {
//    return response
//  })
//},


//clientSort(data) {
//  if (this.get('config.sort.clientSort')) {
//
//    let activeSortingString = function (activeSorting) {
//      if (!activeSorting) return []
//      return activeSorting.map((sortProperty) => {
//        return `record.${sortProperty.value}${sortProperty.direction}`
//      })
//    }
//
//    let resultString = activeSortingString(this.get('activeSorting'))
//
//    return Ember.computed.sort(data, resultString)
//  }
//},
//
//clientFilter() {
//
//},
