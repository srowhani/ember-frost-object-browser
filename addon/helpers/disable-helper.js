import Ember from 'ember';

export function disableHelper(params/*, hash*/) {
  const multiSelect = params[0]
  const counter = params[1]

  if (multiSelect === true) {
    return counter === 0
  } else {
    return counter !== 1
  }
}

export default Ember.Helper.helper(disableHelper);
