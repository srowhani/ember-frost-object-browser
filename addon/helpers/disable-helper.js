import Ember from 'ember'
import {typeAssert} from 'ember-frost-object-browser/utils/error-handle'
const {isPresent} = Ember

export function disableHelper (params/*, hash*/) {
  const disabled = params[0]

  if (isPresent(disabled)) {
    return disabled
  } else {
    const multiSelect = params[1]
    const counter = params[2]

    if (multiSelect === true) {
      return counter === 0
    } else {
      return counter !== 1
    }
  }
}

export default Ember.Helper.helper(disableHelper)
