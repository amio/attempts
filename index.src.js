function attempts (vals, fn) {
  if (fn instanceof Array && typeof vals === 'function') {
    [fn, vals] = [vals, fn]
  }
  return vals.reduce((prev, curr) => {
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

function attemptsSync (vals, fn) {
  if (fn instanceof Array && typeof vals === 'function') {
    [fn, vals] = [vals, fn]
  }
  return vals.reduce((prev, curr) => {
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
