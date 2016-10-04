import Ember from 'ember';

export function disableHelper(params/*, hash*/) {
  const type = params[0]
  const counter = params[1]

  if (type === 'type1') {
    return counter === 0
  } else if (type === 'type2'){
    return counter !== 1
  }
}

export default Ember.Helper.helper(disableHelper);
