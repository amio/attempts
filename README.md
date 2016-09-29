# attempts [![npm-version][npm-badge]][npm-link]

Try func with different args.

## Methods

- `attempts.sync(fn, args)` ⇒ result / `undefined`  

  Try `fn` with `args[n]` one by one, until find a truthy return value.

- `attempts.async(fn, args)` ⇒ `Promise`(resolved with result / rejected with `undefined`)  

  Try `fn` with `args[n]` one by one, until find a truthy return value or
  resolved Promise.

Exceptions within `fn` will be catched & treated as a falsy return.

## Example

Get availiable config:

```javascript
const attempts = require('attempts')

const readConfig = filename => require(filename)
const possibleConfigs = [
  './config.json',
  './config.default.json'
]

const config = attempts.sync(readConfig, possibleConfigs)
```

## License

MIT © [Amio][author]

[npm-badge]:https://img.shields.io/npm/v/attempts.svg?style=flat-square
[npm-link]: https://www.npmjs.com/package/attempts
[author]:   https://github.com/amio
