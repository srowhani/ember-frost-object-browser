import Ember from 'ember'
const {Helper, isArray} = Ember
const {helper} = Helper

// TODO Better repo location?
export function multiSelect ([selectedItems]) {
  return isArray(selectedItems) && selectedItems === 0
}

export default helper(multiSelect)
