# streaming-set

A stream which adds objects written to it to a set, and emits the updated set.

[![Build Status](http://img.shields.io/travis/urbanairship/streaming-set/master.svg?style=flat)](https://travis-ci.org/urbanairship/streaming-set)
[![npm install](http://img.shields.io/npm/dm/streaming-set.svg?style=flat)](https://www.npmjs.org/package/streaming-set)

## Example

```javascript
var streamingSet = require('modules/streaming-set')

var set = streamingSet(['initial', 'tags'])

set.write('old')
// emits ['initial', 'tags', 'old']

set.remove('initial')
// emits ['tags', 'old']

set.clear()
// emits []
```

## API

```javascript
var set = streamingSet([items], [identify]) -> Stream
```

- `items`: (optional) an array of objects with which to seed the set.
- `identify`: (optional) a function which creates keys from items.

Returns a stream. On write, the stream will add the value written to it to a set
(so long as applying `identify` to the item produces a value distinct from any
existing key) that persists between write. On each write, it emits the whole
set, as an array.

### `set.remove(key)`

Apply `identify` to each item in the set, and remove any which match `key`.

### `set.clear()`

Remove all items from the set.

## License

This project is licensed under the Apache License, Version 2.0. See
[LICENSE][license] for the full license.

[license]: ./LICENSE
