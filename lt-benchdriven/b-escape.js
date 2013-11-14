// result : inline-check is best, about 300%++
//
//
// # escape
// re#inline x 295,410 ops/sec ±1.90% (90 runs sampled)
// re#inline-check x 293,859 ops/sec ±1.45% (90 runs sampled)
// re#seperate x 239,757 ops/sec ±1.96% (93 runs sampled)
// re#seperate-check x 5,021,590 ops/sec ±1.51% (94 runs sampled)
//
// # no escape
// re#inline x 1,285,595 ops/sec ±1.42% (95 runs sampled)
// re#inline-check x 4,709,354 ops/sec ±1.94% (91 runs sampled)
// re#seperate x 3,291,164 ops/sec ±1.34% (96 runs sampled)
// re#seperate-check x 241,025 ops/sec ±2.58% (95 runs sampled)


var assert = require('assert')

var Bench = require('benchmark')
var suite = new Bench.Suite

var html = '<html> this has " some & nice """ & < > adsf% & > > & % adsf < a> asd wqer%&8 >< adsf " A"Sdf  "Asd f"&543'
//html = 'html this has some nice and gt lt asdf and gt gt and % asdf gt a gt adsf wqer %^*( adfAqSdf   Asd fa#543'


var escapes = { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }
suite
.add('re#inline', function () {
    return html.replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/&/g, '&amp;')
})
.add('re#inline-check', function () {
    return !/[<>&"]/.test(html) ? html : html.replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/&/g, '&amp;')
})
.add('re#seperate', function () {
    return html.replace(/[<>&"]/g, function (char) {
        return escapes[char]
    })
})
.add('re#seperate-check', function () {
    return !/[<>&"]/.test(html) ? html : html.replace(/[<>&"]/g, function (char) {
        return escapes[char]
    })
})
.on('cycle', function(event) {
    console.log(event.target.toString())
})
.run()

