import Ember from 'ember'

export default function objectBrowserDefaultSort (items, sortProperties) {
  if (!Ember.isPresent(sortProperties)) {
    return
  }

  let normalizedSortProperties = sortProperties.map(sortProperty => {
    let resultArray = []
    if (sortProperty.startsWith('-')) {
      resultArray.pushObject(sortProperty.slice(1))
      resultArray.pushObject('desc')
    } else {
      resultArray.pushObject(sortProperty)
      resultArray.pushObject('asc')
    }
    return resultArray
  })

  return Ember.A(items.slice().sort((itemA, itemB) => {
    for (let i = 0; i < normalizedSortProperties.length; i++) {
      let [prop, direction] = normalizedSortProperties[i]
      let result = Ember.compare(Ember.get(itemA, prop), Ember.get(itemB, prop))
      if (result !== 0) {
        return (direction === 'desc') ? (-1 * result) : result
      }
    }
    return 0
  }))
}
