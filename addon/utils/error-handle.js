import Ember from 'ember'
const {assert, typeOf} = Ember

export function typeAssert (message, tester, type) {
  if (typeof type === 'string') {
    assert(message, typeOf(tester) === type)
  } else {
    let result = false
    type.forEach(entry => {
      result = result || typeOf(tester) === entry
    })
    assert(message, result)
  }
}
