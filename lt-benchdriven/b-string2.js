var assert = require('assert')

var Bench = require('benchmark')
var suite = new Bench.Suite


var string = 'sdf'
var obj = {a:1}
var bool = true
var undef = undefined

suite
.add('string#check.string', function () {
    return typeof string === 'string' ? string : String(string)
})
.add('string#check.obj', function () {
    return typeof obj === 'string' ? obj : String(obj)
})
.add('string#check.bool', function () {
    return typeof bool === 'string' ? bool : String(bool)
})
.add('string#check.undef', function () {
    return typeof undef === 'string' ? undef : String(undef)
})
.on('cycle', function(event) {
    console.log(event.target.toString())
})
.run()

