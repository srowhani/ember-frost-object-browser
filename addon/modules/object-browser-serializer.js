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
    let context = this.get('context')
    let queryObject = this.getQueryObjectFromContext(context)

    const serializedQueryObject = this.willQuery(queryObject)

    let promise = context.get('store').query(this.get('config.model'), serializedQueryObject).then(
      (result) => {
        return this.didReceiveResponse(result)
      }
    )

    this.didQuery()
    return promise
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
