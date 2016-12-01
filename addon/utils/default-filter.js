import Ember from 'ember'

export default function objectBrowserDefaultFilter (data, filter) {
  if (!Ember.isPresent(filter)) {
    return data
  }
  return data.filter((data) => {
    let qualified = true
    let keys = Object.keys(filter)

    keys.forEach(key => {
      if (data.get(key).indexOf(filter[key]) === -1) {
        qualified = false
      }
    })

    return qualified
  })
}
