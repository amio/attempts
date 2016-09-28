const fs = require('fs')
const assert = require('assert')
const attempts = require('.')

const checkFileAvailable = function (path) {
  fs.accessSync(path, fs.constants.R_OK)
  return path
}
const fileExpected = 'package.json'
const fileNames = [
  'nonexistence-a',
  'nonexistence-b',
  'package.json',
  'nonexistence-c'
]
const fileNames404 = [
  'nonexistence-a',
  'nonexistence-b',
  'nonexistence-c'
]

// TEST: attempts.sync()
const testResultSync = attempts.sync(checkFileAvailable, fileNames)
assert.equal(testResultSync, fileExpected, '(sync) should found ' + fileExpected)

// TEST: attempt()
attempts(checkFileAvailable, fileNames).then(resolved => {
  assert.equal(resolved, fileExpected, 'should found ' + fileExpected)
}, rejected => {
  throw new Error('could not found ' + fileExpected)
})

// TEST: attempts.sync() 404
const testResultSync404 = attempts.sync(checkFileAvailable, fileNames404)
assert.equal(undefined, testResultSync404, '(sync) should found nothing')

// TEST: attempts() 404
attempts(checkFileAvailable, fileNames404).then(resolved => {
  throw new Error('found ' + resolved + '?!')
}, rejected => {
  assert.ok(true, 'should found nothing')
})
