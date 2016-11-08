import Ember from 'ember';
const {assert} = Ember

export function disableHelper(params/*, hash*/) {
  const multiSelect = params[0]
  const counter = params[1]
  const method = params[2]
  const items = params[3]

  const result = method && method(items)
  //if (typeof result !== 'boolean') {
  //  assert('The return value from func:disableControl should be type (boolean)')
  //}

  if (multiSelect === true) {
    return counter === 0 || result
  } else {
    return counter !== 1 || result
  }
}

export default Ember.Helper.helper(disableHelper);
