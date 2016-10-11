import Ember from 'ember'
import JsonApiObjectBrowserSerializer from 'ember-frost-object-browser/modules/json-api-object-browser-serializer'


export default {
  filterHandler: filterHandler,
  sortHandler: sortHandler,
  getFromNamespace: getFromNamespace
}

export function getFromNamespace(namespace, propertyKey) {
  let context
  if (arguments.length === 3) {
     context = arguments[2]
  }
  return context ? context.get(namespace + '.' + propertyKey) : this.get(namespace + '.' + propertyKey)
}


export function filterHandler(formValue) {
  this.set('objectBrowserConfig.facetsConfig.value', formValue)
  // create serializer
  const serializer = JsonApiObjectBrowserSerializer.create({
    config: this.get('objectBrowserConfig.serializerConfig'),
    context: this
  })

  // normalize component output
  const filter = serializer.normalizeFilter(formValue)

  // cache normalized result
  this.set('cachedNormalizedFilter', filter)

  // set qp
  const keys = Object.keys(filter)
  let activeFacets = keys.map((key) => {
    return {
      id: key,
      value: formValue[key]
    }
  })
  this.set('activeFacets', activeFacets)

  // issue query if necessary
  if (!this.get('objectBrowserConfig.serializerConfig.filter.clientFilter')) {
    //console.log('run server filter')
    let modelPath = this.get('objectBrowserConfig.listConfig.items')
    serializer.query().then(
      (response) => {
        this.clearListState()
        this.set(modelPath, this.didReceiveResponse(response))
      },
      (error) => {
        this.queryErrorHandler(error)
      }
    )
  }
}

export function sortHandler (sortItems) {
  // create serializer
  const serializer = JsonApiObjectBrowserSerializer.create({
    config: this.get('objectBrowserConfig.serializerConfig'),
    context: this
  })

  // normalize component output
  const sort = serializer.normalizeSort(sortItems)

  // cache normalized result
  this.set('cachedNormalizedSort', sort)

  // TODO need to change sortItems to normalized sort
  // set qp
  let activeSorting = sortItems.map(function (item) {
    return {value: item.value, direction: item.direction}
  })
  this.set('activeSorting', activeSorting)

  // issue query if necessary
  if (!this.get('objectBrowserConfig.serializerConfig.sort.clientSort')) {
    console.log('run server sort')
    let modelPath = this.get('objectBrowserConfig.listConfig.items')
    serializer.query().then(
      (response) => {
        this.clearListState()
        this.set(modelPath, this.didReceiveResponse(response))
      },
      (error) => {
        this.queryErrorHandler(error)
      }
    )
  }
}
