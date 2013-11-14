// templayed[0] x 8,969,200 ops/sec ±0.48% (98 runs sampled)
// lt[0] x 9,048,583 ops/sec ±0.45% (92 runs sampled)
// templayed[1] x 8,753,883 ops/sec ±0.60% (100 runs sampled)
// lt[1] x 8,873,863 ops/sec ±0.46% (94 runs sampled)
// templayed[2] x 927,405 ops/sec ±0.43% (99 runs sampled)
// lt[2] x 699,274 ops/sec ±0.77% (100 runs sampled)
// templayed[3] x 495,716 ops/sec ±0.33% (100 runs sampled)
// lt[3] x 365,096 ops/sec ±0.62% (99 runs sampled)
// templayed[4] x 21,590,930 ops/sec ±0.61% (96 runs sampled)
// lt[4] x 18,110,056 ops/sec ±0.69% (96 runs sampled)
// templayed[5] x 21,635,930 ops/sec ±0.73% (94 runs sampled)
// lt[5] x 17,127,915 ops/sec ±0.53% (95 runs sampled)
// templayed[6] x 19,071,263 ops/sec ±1.09% (96 runs sampled)
// lt[6] x 14,082,005 ops/sec ±0.64% (93 runs sampled)
// templayed[7] x 4,781,131 ops/sec ±0.83% (99 runs sampled)
// lt[7] x 5,216,887 ops/sec ±1.13% (96 runs sampled)
// templayed[8] x 4,843,957 ops/sec ±0.46% (96 runs sampled)
// lt[8] x 11,261,448 ops/sec ±0.45% (100 runs sampled)
// templayed[9] x 1,841,234 ops/sec ±2.29% (96 runs sampled)
// lt[9] x 2,289,983 ops/sec ±0.75% (101 runs sampled)
// templayed[10] x 1,005,457 ops/sec ±1.96% (98 runs sampled)
// lt[10] x 1,494,461 ops/sec ±0.62% (99 runs sampled)
// templayed[11] x 2,454,442 ops/sec ±0.29% (102 runs sampled)
// lt[11] x 210,399 ops/sec ±0.43% (97 runs sampled)

var bench = [{ // 0
    source: "<p>My name is {{name}}!</p>",
    data: {name: "Paul Engel"}
}, { // 1
    source: "<p>My name is {{name}}!{{!name}}</p>",
    data: {name: "Paul Engel"}
}, { // 2
    source: "<p>{{html}} {{&html}}</p>",
    data: {html: "<strong>Paul Engel</strong>"}
}, { // 3
    source: "<p>{{html}} {{html}}</p>",
    data: {html: "<strong>Paul Engel</strong>"}
}, { // 4
    source: "<p>This is shown!{{#show}} Psst, this is never shown{{/show}}</p>",
    data: {}
}, { // 5
    source: "<p>This is shown!{{#show}} Psst, this is never shown{{/show}}</p>",
    data: {show: false}
}, { // 6
    source: "<p>This is shown!{{#shown}} And, this is also shown{{/shown}}</p>",
    data: {shown: true}
}, { // 7
    source: "<p>My name is {{person.first_name}} {{person.last_name}}!</p>",
    data: {person: {first_name: "Paul", last_name: "Engel"}}
}, { // 8
    source: "{{name}}<ul>{{#names}}<li>{{name}}</li>{{/names}}</ul>{{^names}}Sorry, no people to list!{{/names}}",
    data: {names: []}
}, { // 9
    source: "<p>{{name}}</p><ul>{{#names}}<li>{{name}}</li>{{/names}}</ul>{{^names}}Sorry, no people to list!{{/names}}<p>{{name}}</p>",
    data: {name: "Chunk Norris", names: [{name: "Paul"}, {name: "Engel"}]}
}, { // 10
    source: "<ul>{{#names}}<li>{{.}}{{foo}}</li>{{/names}}</ul>",
    data: {names: ["Paul", "Engel"]}
}, { // 11
    source: "<ul>{{#names}}<li>{{fullName}}</li>{{/names}}</ul>",
    data: {
        names: [{firstName: "Paul", lastName: "Engel"}, {firstName: "Chunk", lastName: "Norris"}],
        fullName: function() {
            return this.lastName + ", " + this.firstName;
        }
    }
}]



var lt = require('./lt')
var t = require('./templayed')

var Bench = require('benchmark')
var suite = new Bench.Suite

bench.forEach(function (item) {
    item.templayed = t(item.source)
    item.lt = lt(item.source)
})

bench.forEach(function (item, i) {
    //console.log('templayed[%s]: %s', i, item.templayed.toString());
    //console.log('lt[%s]: %s', i, item.lt.toString());
    suite
    .add('templayed[' +i +']', function () {
        item.result = item.templayed(item.data)
    })
    .add('lt[' +i +']', function () {
        item.result = item.lt(item.data)
    })
})


suite
.on('cycle', function(event) {
    console.log(event.target.toString())
})
.run()

