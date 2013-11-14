// re#multi x 1,005,371 ops/sec ±2.45% (91 runs sampled)
// re#single x 2,073,734 ops/sec ±1.81% (91 runs sampled)

var assert = require('assert')

var Bench = require('benchmark')
var suite = new Bench.Suite

suite
.add('re#multi', function () {
    var count = 0
    '../../../../../../haha'.replace(/\.\.\//g, function () {
        count++
        return ''
    })
    assert.strictEqual(count, 6)
})
.add('re#single', function () {
    var count = 0
    '../../../../../../haha'.replace(/^(\.\.\/)+/, function (all, one) {
        count = all.length / one.length
        return ''
    })
    assert.strictEqual(count, 6)
})
.on('cycle', function(event) {
    console.log(event.target.toString())
})
.run()

