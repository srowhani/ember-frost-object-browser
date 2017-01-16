import Ember from 'ember'
const {isArray} = Ember

// TODO Better repo location?
export function singleSelect ([selectedItems]) {
  return isArray(selectedItems) && selectedItems.length !== 1
}

export default Ember.Helper.helper(singleSelect)
