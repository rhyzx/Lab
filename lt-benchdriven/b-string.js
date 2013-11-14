// undef#concat x 12,521,045 ops/sec ±1.82% (85 runs sampled)
// undef#check x 39,808,157 ops/sec ±4.21% (60 runs sampled)
// undef#string x 16,413,910 ops/sec ±2.80% (76 runs sampled)
// obj#concat x 4,213,250 ops/sec ±1.63% (97 runs sampled)
// obj#string x 5,780,074 ops/sec ±1.90% (94 runs sampled)
// obj#toString x 13,558,325 ops/sec ±1.97% (87 runs sampled)
// bool#concat x 11,744,096 ops/sec ±1.67% (87 runs sampled)
// bool#string x 18,396,971 ops/sec ±1.76% (83 runs sampled)
// bool#toString x 38,638,177 ops/sec ±2.47% (73 runs sampled)
// string#concat x 44,722,830 ops/sec ±2.83% (66 runs sampled)
// string#string x 27,718,193 ops/sec ±2.19% (80 runs sampled)
// string#toString x 38,261,832 ops/sec ±2.30% (76 runs sampled)
// number#concat x 44,599,127 ops/sec ±2.95% (88 runs sampled)
// number#string x 22,173,004 ops/sec ±2.30% (92 runs sampled)
// number#toString x 30,335,598 ops/sec ±3.14% (76 runs sampled)

var assert = require('assert')

var Bench = require('benchmark')
var suite = new Bench.Suite


var obj = {a:1}

var number = 123

var func = function () {
    this.is.func  = 'hahaha'
}

suite
//.add('function#concat', function () {
    //return func +''
//})
//.add('function#check', function () {
    //return (typeof func === 'function' ? 'function' : '') +''
//})
//.add('function#string', function () {
    //return String(func) +''
//})
.add('undef#concat', function () {
    return undefined +''
})
.add('undef#check', function () {
    return (typeof undefined === 'undefined' ? 'undefined' : '') +''
})
.add('undef#string', function () {
    return String(undefined) +''
})
.add('obj#concat', function () {
    return obj +''
})
.add('obj#string', function () {
    return String(obj)
})
.add('obj#toString', function () {
    return obj.toString()
})
.add('bool#concat', function () {
    return true +''
})
.add('bool#string', function () {
    return String(true)
})
.add('bool#toString', function () {
    return true.toString()
})
.add('number#concat', function () {
    return number +''
})
.add('number#string', function () {
    return String(number)
})
.add('number#toString', function () {
    return number.toString()
})
.add('string#concat', function () {
    return '123' +''
})
.add('string#string', function () {
    return String('123')
})
.add('string#toString', function () {
    return '123'.toString()
})
.on('cycle', function(event) {
    console.log(event.target.toString())
})
.run()

