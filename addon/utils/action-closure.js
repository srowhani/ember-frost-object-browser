import Ember from 'ember'
const {typeOf} = Ember

export function create (method, callback) {
  let context = this
  if (typeOf(callback) === 'function') {
    return function wrapperFunc () {
      return callback(method, arguments)
    }
  } else {
    return function wrapperFunc () {
      return method.apply(context, arguments)
    }
  }
}

export default create
