import Ember from 'ember'
const {Helper, isArray} = Ember
const {helper} = Helper

// TODO Better repo location?
export function singleSelect ([selectedItems]) {
  return isArray(selectedItems) && selectedItems.length !== 1
}

export default helper(singleSelect)
