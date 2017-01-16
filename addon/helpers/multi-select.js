import Ember from 'ember'
const {isArray} = Ember

// TODO Better repo location?
export function multiSelect ([selectedItems]) {
  return isArray(selectedItems) && selectedItems === 0
}

export default Ember.Helper.helper(multiSelect)
