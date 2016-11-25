import Ember from 'ember'
import {typeAssert} from 'ember-frost-object-browser/utils/error-handle'
const {isPresent, typeOf} = Ember

export function disableHelper (params/*, hash*/) {
  const multiSelect = params[0]
  const counter = params[1]
  const method = params[2]
  const items = params[3]
  const result = method && method(items)

  if (isPresent(method)) {
    typeAssert(`Expected return value from 'disabledControl' to be boolean, received ${typeOf(result)}`,
      result, 'boolean')
  }

  if (multiSelect === true) {
    return counter === 0 || result
  } else {
    return counter !== 1 || result
  }
}

export default Ember.Helper.helper(disableHelper)
