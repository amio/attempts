# attempts [![npm-version][npm-badge]][npm-link]

Try func with different args.

## Example

```javascript
const fs = require('fs')
const attempts = require('attempts')

const files = [
  'config.json',
  'config.default.json'
]

function getConfig (filename) {
  return require(filename)
}

attempts(getConfig, files).then(config => {
  console.log('Found', config)
})
```

## License

MIT © [Amio][author]

[npm-badge]:https://img.shields.io/npm/v/attempts.svg?style=flat-square
[npm-link]: https://www.npmjs.com/package/attempts
[author]:   https://github.com/amio
