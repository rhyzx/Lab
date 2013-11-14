// variable get x 724,396 ops/sec ±1.86% (91 runs sampled)  20x slow!!!
// while x 12,572,939 ops/sec ±1.94% (90 runs sampled)
// inline x 15,315,191 ops/sec ±3.02% (84 runs sampled)
// inline-opt x 18,122,821 ops/sec ±1.77% (91 runs sampled)

var assert = require('assert')

var Bench = require('benchmark')
var suite = new Bench.Suite



var stack = [{name: undefined}, {}, {name: undefined}, {}, {name: undefined}, {}, {}, {}, {}, {}, {}, {}]

var stack_opt = {}

for (var i=0, len=stack.length; i<len; i++) {
    stack_opt['v' +i] = stack[i]
}

suite
.add('variable get', function () {
    var index = 11
    var context = stack[index]
    var name = 'name'
    var value
    while (typeof (value = context[name]) === 'undefined' && index)
        context = stack[--index]
})
.add('while', function () {
    var index = 11
    var context = stack[index]
    var value
    while (typeof (value = context.name) === 'undefined' && index)
        context = stack[--index]
})
.add('inline', function () {
    var value = 
        typeof stack[11].name !== 'undefined' ? stack[11].name :
        typeof stack[10].name !== 'undefined' ? stack[10].name :
        typeof stack[9].name !== 'undefined' ? stack[9].name :
        typeof stack[8].name !== 'undefined' ? stack[8].name :
        typeof stack[7].name !== 'undefined' ? stack[7].name :
        typeof stack[6].name !== 'undefined' ? stack[6].name :
        typeof stack[5].name !== 'undefined' ? stack[5].name :
        typeof stack[4].name !== 'undefined' ? stack[4].name :
        typeof stack[3].name !== 'undefined' ? stack[3].name :
        typeof stack[2].name !== 'undefined' ? stack[2].name :
        typeof stack[1].name !== 'undefined' ? stack[1].name :
        typeof stack[0].name !== 'undefined' ? stack[0].name :
        undefined
})
.add('inline-opt', function () {
    var value = 
        typeof stack_opt.v11.name !== 'undefined' ? stack_opt.v11.name :
        typeof stack_opt.v10.name !== 'undefined' ? stack_opt.v10.name :
        typeof stack_opt.v9.name !== 'undefined' ? stack_opt.v9.name :
        typeof stack_opt.v8.name !== 'undefined' ? stack_opt.v8.name :
        typeof stack_opt.v7.name !== 'undefined' ? stack_opt.v7.name :
        typeof stack_opt.v6.name !== 'undefined' ? stack_opt.v6.name :
        typeof stack_opt.v5.name !== 'undefined' ? stack_opt.v5.name :
        typeof stack_opt.v4.name !== 'undefined' ? stack_opt.v4.name :
        typeof stack_opt.v3.name !== 'undefined' ? stack_opt.v3.name :
        typeof stack_opt.v2.name !== 'undefined' ? stack_opt.v2.name :
        typeof stack_opt.v1.name !== 'undefined' ? stack_opt.v1.name :
        typeof stack_opt.v0.name !== 'undefined' ? stack_opt.v0.name :
        undefined
})
.on('cycle', function(event) {
    console.log(event.target.toString())
})
.run()

