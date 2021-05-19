/**
 * Copyright 2015 Urban Airship and Contributors
 */
var through = require('through')

module.exports = set

function set(items, identify) {
  var stream = through(add)

  identify = identify || defaultIdentify
  items = (items || []).slice()

  stream.identify = identify
  stream.remove = remove
  stream.clear = clear

  return stream

  function add(item) {
    var key = identify(item)
      , matches = false

    matches = items.some(function(val) {
      return identify(val) === key
    })

    if(matches) {
      return
    }

    items.push(item)
    stream.queue(items)
  }

  function remove(key) {
    items = items.filter(function(val) {
      return identify(val) !== key
    })

    stream.queue(items)
  }

  function clear() {
    items = []
    stream.queue(items)
  }
}

function defaultIdentify(key) {
  return key
}
