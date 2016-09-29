function attempts (fn, args) {
  return args.reduce((prev, curr) => {
    return prev.then(resolved => resolved, rejected => {
      try {
        const ret = fn(...[].concat(curr))
        return ret ? Promise.resolve(ret) : Promise.reject()
      } catch (e) {
        return Promise.reject()
      }
    })
  }, Promise.reject())
}

function attemptsSync (fn, args) {
  return args.reduce((prev, curr) => {
    if (prev) return prev
    try {
      const ret = fn(...[].concat(curr))
      return ret
    } catch (e) {}
  }, false)
}

module.exports = {
  default: attempts,
  async: attempts,
  sync: attemptsSync
}
