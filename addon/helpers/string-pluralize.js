import Ember from 'ember'
const {Helper, isNone, isPresent} = Ember

/* eslint-disable complexity */
export function stringPluralize (params, hash) {
  let count = params[0]
  let word = params[1]
  if (count !== 1) {
    count = count || 0
    word = Ember.String.pluralize(word)
  }

  let omitCount = isNone(hash) ? false : isPresent(hash.omitCount) ? hash.omitCount : false
  return (omitCount ? '' : count + ' ') + word
}
/* eslint-enable complexity */

export default Helper.helper(stringPluralize)
