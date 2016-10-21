const fs = require('fs')
const test = require('tape')

const attempts = require('./index.js')
const attemptsAsync = attempts.async
const attemptsSync = attempts.sync

const checkFileAvailable = function (path) {
  fs.accessSync(path, (fs.constants || fs).R_OK)
  return path
}
const nameExpected = 'package.json'
const fileNames = ['package.js', 'package.json', 'package.jsonp']
const fileNames404 = ['nonexistence-a', 'nonexistence-b', 'nonexistence-c']

const echoReturnValue = x => x === 'found' ? Promise.reject() : x
const returnValues = [0, '', false, undefined, 'found', 'promise']

test('attempts.async()', t => {
  t.plan(3)

  attemptsAsync(fileNames, checkFileAvailable).then(resolved => {
    t.equal(resolved, nameExpected, 'should found ' + nameExpected)
  }, rejected => {
    t.fail('could not found ' + nameExpected)
  })

  attemptsAsync(fileNames404, checkFileAvailable).then(resolved => {
    t.fail('found ' + resolved + '?!')
  }, rejected => {
    t.pass('should found nothing')
  })

  attemptsAsync(returnValues, echoReturnValue).then(resolved => {
    t.equal(resolved, 'promise', 'should get "promise"')
  }, rejected => {
    t.fail('could not get "found"')
  })
})

test('attempts.sync()', t => {
  t.plan(6)

  const resultFile = attemptsSync(fileNames, checkFileAvailable)
  t.equal(resultFile, nameExpected, '(sync) should found ' + nameExpected)

  const resultFileR = attemptsSync(checkFileAvailable, fileNames)
  t.equal(resultFileR, nameExpected, '(sync.r) should found ' + nameExpected)

  const result404 = attemptsSync(fileNames404, checkFileAvailable)
  t.equal(result404, undefined, '(sync) should found nothing')

  const result404R = attemptsSync(checkFileAvailable, fileNames404)
  t.equal(result404R, undefined, '(sync.r) should found nothing')

  const resultPromise = attemptsSync(returnValues, echoReturnValue)
  t.ok(resultPromise instanceof Promise, '(sync) should get a rejected Promise')
  resultPromise.catch(e => e)

  const resultPromiseR = attemptsSync(returnValues, echoReturnValue)
  t.ok(resultPromiseR instanceof Promise, '(sync.r) should get a rejected Promise')
  resultPromiseR.catch(e => e)
})
