const fs = require('fs')
const assert = require('assert')
const attempts = require('.')

const checkFileAvailable = function (path) {
  fs.accessSync(path, fs.constants.R_OK)
  return path
}
const nameExpected = 'package.json'
const fileNames = [
  'package.js',
  'package.jso',
  'package.json',
  'package.jsonp'
]
const fileNames404 = [
  'nonexistence-a',
  'nonexistence-b',
  'nonexistence-c'
]

// TEST: attempts.sync()
const testResultSync = attempts.sync(checkFileAvailable, fileNames)
assert.equal(testResultSync, nameExpected, '(sync) should found ' + nameExpected)

// TEST: attempt()
attempts(checkFileAvailable, fileNames).then(resolved => {
  assert.equal(resolved, nameExpected, 'should found ' + nameExpected)
}, rejected => {
  throw new assert.AssertionError('could not found ' + nameExpected)
})

// TEST: attempts.sync() 404
const testResultSync404 = attempts.sync(checkFileAvailable, fileNames404)
assert.equal(undefined, testResultSync404, '(sync) should found nothing')

// TEST: attempts() 404
attempts(checkFileAvailable, fileNames404).then(resolved => {
  throw new assert.AssertionError('found ' + resolved + '?!')
}, rejected => {
  assert.ok(true, 'should found nothing')
})

process.on('unhandledRejection', (reason) => {
  throw reason
})
