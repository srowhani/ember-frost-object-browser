export default {
  prepareQueryObject () {
    return {
      filterQueryParam: this.get('filterQueryParam'),
      sortQueryParam: this.get('sortQueryParam'),
      pageQueryParam: {
        nextOffset: this.get('__lastOffset'),
        pageSize: this.get('__pageSize')
      }
    }
  },

  requestNext (queryObject, serializer) {
    let dataKey = this.get('objectBrowserConfig.list.items')
    serializer.query(queryObject).then((response) => {
      this.set(dataKey, response)
    })
  },

  /* eslint-disable */
  processPageResponse (response, controller, {page}) {
    let meta = response.get('meta')
    let size = meta.size
    let nextOffset = meta.nextOffset

    controller.set('__size', size)
    controller.set('__nextOffset', nextOffset)

    if (Array.isArray(page)) {
      controller.set('__firstOffset', 0)
      controller.set('__lastOffset', nextOffset)
      return response
    } else if (typeof page === 'object' && typeof controller.get('__firstOffset') === 'undefined' && typeof controller.get('__lastOffset') === 'undefined') {
      controller.setProperties({
        __firstOffset: 0,
        __lastOffset: nextOffset
      })
      return response
    } else if (controller.get('__lastOffset') < nextOffset){
      let dataKey = controller.get('objectBrowserConfig.list.items')
      let result = controller.get(dataKey)
      controller.setProperties({
        __lastOffset: nextOffset
      })
      return result.content
        ? result.content.concat(response.content ? response.content : response)
        : result.concat( response.content ? response.content : response )
    } else if (controller.get('__lastOffset') === nextOffset) {
      let dataKey = controller.get('objectBrowserConfig.list.items')
      return controller.get(dataKey)
    }
  }
  /* eslint-enable */
}
