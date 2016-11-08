export default {
  prepareQueryObject: function () {
    return {
      filterQueryParam: this.get('filterQueryParam'),
      sortQueryParam: this.get('sortQueryParam'),
      pageQueryParam: {
        nextOffset: this.get('__lastOffset'),
        pageSize: this.get('__pageSize')
      }
    }
  },

  requestNext: function (queryObject, serializer) {
    let dataKey = this.get('objectBrowserConfig.listConfig.items')
    serializer.query(queryObject).then((response) => {
      this.set(dataKey, response)
    })
  },

  setPageQueryParam: function (controller) {
    let nextOffset = controller.get('__lastOffset')
    let size = controller.get('__size')
    let pageObject = {
      nextOffset,
      size
    }

    let normalizedPageObject = this.normalizePage(pageObject)
    controller.set('pageQueryParam', normalizedPageObject)
  },

  setPageQueryParamForLoadPrevious: function (controller) {
    debugger;
    let nextOffset = controller.get('__firstOffset')
    let size = controller.get('__size')
    let pageObject = {
      nextOffset: nextOffset - size,
      size
    }

    let normalizedPageObject = this.normalizePage(pageObject)

    //let dataKey = controller.get('objectBrowserConfig.listConfig.items')
    //let result = controller.get(dataKey)
    //
    //this.query(normalizedPageObject).then((response) => {
    //  return response.content ? response.content.concat(result.content ? result.content : result) : response.concat( result.content ? result.content : result )
    //})

    controller.set('pageQueryParam', normalizedPageObject)
  },

  processPageResponse: function (response, controller, {page}) {
    //let page = controller.get('pageQueryParam')

    let meta = response.get('meta')
    let size = meta.size
    let nextOffset = meta.nextOffset

    controller.set('__size', size)
    controller.set('__nextOffset', nextOffset)

    //let pageSize = controller.get('_pageSize')
    if (Array.isArray(page)) {
      controller.set('__firstOffset', 0)
      controller.set('__lastOffset', nextOffset)
      //controller.set('__firstPage', 1)
      //controller.set('__lastPage', nextOffset)
      return controller.didReceiveResponse(response)
    }
    else if (typeof page === 'object' && typeof controller.get('__firstOffset') === 'undefined' && typeof controller.get('__lastOffset') === 'undefined') {
      console.log(controller)
      controller.setProperties({
        __firstOffset: page.nextOffset,
        __lastOffset: nextOffset
      })
      return response
    }
    else if (controller.get('__lastOffset') < nextOffset){
      let dataKey = controller.get('objectBrowserConfig.listConfig.items')
      let result = controller.get(dataKey)
      controller.setProperties({
        __lastOffset: nextOffset
      })
      return result.content ? result.content.concat(response.content ? response.content : response) : result.concat( response.content ? response.content : response )
    }

    else if (controller.get('__lastOffset') > nextOffset) {
      debugger;
      let firstOffset = controller.get('_firstOffset')
      let dataKey = controller.get('objectBrowserConfig.listConfig.items')
      let result = controller.get(dataKey)
      controller.setProperties({
        //__firstOffset: nextOffset - 2 * controller.get('firstOffset') > 0 ? nextOffset - 2 * controller.get('firstOffset') : 0
        __firstOffset: firstOffset - 30
        //  : nextOffset - 2 * controller.get('firstOffset') > 0 ? nextOffset - 2 * controller.get('firstOffset') : 0
      })
      return response.content ? response.content.concat(result.content ? result.content : result) : response.concat( result.content ? result.content : result )
    }

    else if (controller.get('__lastOffset') === nextOffset) {
      let dataKey = controller.get('objectBrowserConfig.listConfig.items')
      return controller.get(dataKey)
    }
  }

}


//if (Ember.isEmpty(controller.get('firstPage')) && Ember.isEmpty(controller.get('lastPage'))) {
//  if (params.page > 0) {
//    requests.unshift(controller.query({ filter, sort, page: Number(page) - 1 }))
//  }
//  requests.push(controller.query({ filter, sort, page: Number(page) + 1 }))
//}



//if (Ember.isEmpty(controller.get('firstPage'))) {
//  controller.setProperties({
//    firstPage: page != 0 ? Number(page) - 1 : 0,
//    lastPage: Number(page) + 1
//  })
//} else if (page > this.get('lastPage')) {
//  this.setProperties({
//    lastPage: page
//  })
//  return this.controllerFor('browser').get('model').concat(result) // append
//} else if (page < this.get('firstPage')) {
//  this.setProperties({
//    firstPage: page
//  })
//  return result.concat(this.controllerFor('browser').get('model')) // prepend
//}

//return controller.didReceiveResponse(response)
