# attempts [![npm-version][npm-badge]][npm-link]

Try func with different args.

## Methods

```bash
npm install attempts
```

- `attempts.sync(fn: function, args: array)`  
  Try `fn` with `args` one by one, until find a truthy return value.

- `attempts.async(fn: function, args: array)` returns a `Promise`  
  Try `fn` with `args` one by one, until find a truthy return value or
  resolved Promise.

Exceptions within `fn` will be catched & treated as falsy return.

## Example

Get availiable config:

```javascript
const attempts = require('attempts')

const getConfig = filename => require(filename)
const possibleConfigs = [
  './config.json',
  './config.default.json'
]

const config = attempts.sync(getConfig, possibleConfigs)
```

## License

MIT © [Amio][author]

[npm-badge]:https://img.shields.io/npm/v/attempts.svg?style=flat-square
[npm-link]: https://www.npmjs.com/package/attempts
[author]:   https://github.com/amio
