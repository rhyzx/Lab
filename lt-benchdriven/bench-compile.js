var bench = [{ // non
    source: 'Hello world',
    data: {}
}, { // basic
    source: 'Hello {{name}}! You have {{count}} new messages.',
    data:   { name: 'Mick', count: 30 }
}, { // if
    source: '{{#check}}pass{{/check}}',
    data:   { check: true }
}, { // use obj
    source: '{{#person}}{{name}}{{age}}{{/person}}',
    data:   { person: { name: 'Larry', age: 45 } }
}, { // iterator list
    source: '{{#names}}{{name}}{{/names}}',
    data:   { names: [{name: 'Moe'}, {name: 'Larry'}, {name: 'Curly'}, {name: 'Shemp'}] }
}, { // invert
    source: '{{^not}}show me the money{{/not}}',
    data:   { not: false }
}, { // complex
    source: (function () {/*
        <header>{{header}}</header>
        <ul>
        {{#items}}
            <li>{{name}} : {{value}}</li>
        {{/items}}
        </ul>
        {{#footer}}
        <footer>{{footer}}</footer>
        {{/footer}}
    */}).toString().slice(16, -4),
    data:   { header: 'this is header', items: [
        {name: 'a'}, {name: 'b'}, {name: 'c'}, {name: 'd'}, {name: 'e'},
        {name: 'a'}, {name: 'b'}, {name: 'c'}, {name: 'd'}, {name: 'e'},
        {name: 'a'}, {name: 'b'}, {name: 'c'}, {name: 'd'}, {name: 'e'}
    ]}
}]




var lt = require('./lt')
var ltn = require('../lt')
var Handlebars = require('handlebars')
var Mustache = require('mustache')

var Bench = require('benchmark')
var suite = new Bench.Suite


var c = 0

suite
//.add('Handlebars#compile', function () {
    //for (var i=0, len=bench.length; i<len; i++) {
        //var item = bench[i]
        //item.handlebars = Handlebars.precompile(item.source)
    //}
//})
//.add('Mustache#compile', function () {
    //for (var i=0, len=bench.length; i<len; i++) {
        //var item = bench[i]
        //item.mustache = Mustache.compile(item.source + c++)
    //}
//})
.add('lt#compile', function () {
    for (var i=0, len=bench.length; i<len; i++) {
        var item = bench[i]
        item.lt = lt.compile(item.source)
    }
})
.add('ltn#compile', function () {
    for (var i=0, len=bench.length; i<len; i++) {
        var item = bench[i]
        item.ltn = ltn.compile(item.source)
    }
})
.on('cycle', function(event) {
    console.log(event.target.toString())
})
.run()

