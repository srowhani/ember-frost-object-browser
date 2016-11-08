export function create (method) {
  let context = this
  return function wrapperFunc () {
    return method.apply(context, arguments)
  }
}

export default create

