import Ember from 'ember';

export function logicOr(params/*, hash*/) {
  if (params.length !== 2) Ember.Logger.error(`logic-or helper expects 2 arguments, received ${params.length}`)

  return params[0] || params[1]
}

export default Ember.Helper.helper(logicOr);
