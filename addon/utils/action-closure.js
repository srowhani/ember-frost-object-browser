//export function create (method) {
//  let context = this
//  return function wrapperFunc () {
//    return method.apply(context, arguments)
//  }
//}
//
//export default create


export function create (action, actionArgs = []) {
  //TODO  type check actionArgs should be array.
  let context = this
  let actionArgsLength = actionArgs.length
  let wrapperFunc

  if (actionArgsLength > 0) {
    wrapperFunc = function (...passedArguments) {
      let args = new Array(actionArgsLength + passedArguments.length)

      for (let i = 0; i < actionArgsLength; i++) {
        args[i] = actionArgs[i]
      }

      for (let i = 0; i < passedArguments.length; i++) {
        args[i + actionArgsLength] = passedArguments[i]
      }

      return action.apply(context, args)
    }
  } else {
    wrapperFunc = function () {
      return action.apply(context, arguments)
    }
  }

  return wrapperFunc
}



export default create
