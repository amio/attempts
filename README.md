# attempts [![npm-version][npm-badge]][npm-link]

[![Greenkeeper badge](https://badges.greenkeeper.io/amio/attempts.svg)](https://greenkeeper.io/)

Try func with different args.

## Methods

- `attempts.sync(values, fn)` *⇒ result / `undefined`*  
  Invoke `fn` with `values[n]` one by one, until get a truthy return value.

- `attempts.async(values, fn)` *⇒ `Promise` (resolved with result / rejected with `undefined`)*  
  Invoke `fn` with `values[n]` one by one, until get a truthy return value or
  resolved Promise.

NOTE: Exceptions within `fn` will be catched & treated as a falsy return, handy for
some Node.js API (`fs.accessSync`, `fs.statSync`, etc.) throw errors regularly.

## Example

Get availiable config:

```javascript
const attempts = require('attempts')

const readConfig = filename => require(filename)
const possibleConfigs = [
  './config.json',
  './config.default.json'
]

const config = attempts.sync(possibleConfigs, readConfig)
```

## License

MIT © [Amio][author]

[npm-badge]:https://img.shields.io/npm/v/attempts.svg?style=flat-square
[npm-link]: https://www.npmjs.com/package/attempts
[author]:   https://github.com/amio
