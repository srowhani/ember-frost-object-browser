export default {
  setPageQueryParam: function (controller) {
    let nextOffset = controller.get('__nextOffset')
    let size = controller.get('__size')
    let pageObject = {
      nextOffset,
      size
    }

    let normalizedPageObject = this.normalizePage(pageObject)
    controller.set('pageQueryParam', normalizedPageObject)
  },

  processPageResponse: function (response, controller) {
    let page = controller.get('pageQueryParam')

    let meta = response.get('meta')
    let size = meta.size
    let nextOffset = meta.nextOffset

    controller.set('__size', size)
    controller.set('__nextOffset', nextOffset)

    //let pageSize = controller.get('_pageSize')
    if (Array.isArray(page)) {
      controller.set('__firstPage', 1)
      controller.set('__lastPage', nextOffset)
      return controller.didReceiveResponse(response)
    } else if (controller.get('__lastPage') < nextOffset){
      let dataKey = controller.get('objectBrowserConfig.listConfig.items')
      let result = controller.get(dataKey)
      controller.setProperties({
        __lastPage: nextOffset
      })
      return result.concat(response)
    }
    //else if (meta.nextOffset/pageSize < controller.get('_lastPage')) {
    //  console.log('<<<<< first page')
    //}
    else if (controller.get('__lastPage') === nextOffset) {
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
