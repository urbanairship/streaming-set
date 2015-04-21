var test = require('tape')

var streamingSet = require('../')

test('adds first item', function(t) {
  var set

  set = streamingSet([], getTag)

  set.on('data', function(data) {
    t.deepEqual(data, [{tag: 'first_tag'}])
    t.end()
  })

  set.write({tag: 'first_tag'})
})

test('adds second item', function(t) {
  var set = streamingSet([{tag: 'first_'}], getTag)

  set.on('data', function(data) {
    t.deepEqual(data, [{tag: 'first_'}, {tag: 'second_'}])
    t.end()
  })

  set.write({tag: 'second_'})
})

test('only adds unique items', function(t) {
  var set = streamingSet(['first_'])

  set.on('data', function(data) {
    t.deepEqual(data, ['first_', 'second_'])
    t.end()
  })

  set.write('first_')
  set.write('second_')
  set.write('first_')
})

test('removes items', function(t) {
  var initial = [{tag: 'first_'}, {tag: 'second_'}, {tag: 'third_'}]

  var set = streamingSet(initial, getTag)

  set.on('data', function(data) {
    t.deepEqual(data, [{tag: 'first_'}, {tag: 'third_'}])
    t.end()
  })

  set.remove('second_')
})

test('clears set', function(t) {
  var set = streamingSet(['first_', 'second_', 'third_'])

  set.on('data', function(data) {
    t.equal(data.length, 0)
    t.end()
  })

  set.clear()
})

function getTag(obj) {
  return obj.tag
}
