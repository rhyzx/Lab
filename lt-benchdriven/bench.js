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




var lt = require('lt')
var Templayed = require('templayed')
var Handlebars = require('handlebars')
var Mustache = require('mustache')

var Bench = require('benchmark')
var suite = new Bench.Suite

for (var i=0, len=bench.length; i<len; i++) {
    var item = bench[i]
    item.lt = lt(item.source)
    item.templayed = Templayed(item.source)
    item.handlebars = Handlebars.compile(item.source)
    item.mustache = Mustache.compile(item.source)
}

suite
.add('Mustache#compile', function () {
    for (var i=0, len=bench.length; i<len; i++) {
        var item = bench[i]
        item.mustache = Mustache.compile(item.source)
    }
})
.add('Handlebars#compile', function () {
    for (var i=0, len=bench.length; i<len; i++) {
        var item = bench[i]
        item.handlebars = Handlebars.compile(item.source)
    }
})
.add('Templayed#compile', function () {
    for (var i=0, len=bench.length; i<len; i++) {
        var item = bench[i]
        item.templayed = Templayed(item.source)
    }
})
.add('lt#compile', function () {
    for (var i=0, len=bench.length; i<len; i++) {
        var item = bench[i]
        item.lt = lt.compile(item.source)
    }
})
.add('Mustache#render', function () {
    for (var i=0, len=bench.length; i<len; i++) {
        var item = bench[i]
        item.result = item.mustache(item.data)
    }
})
.add('Handlebars#render', function () {
    for (var i=0, len=bench.length; i<len; i++) {
        var item = bench[i]
        item.result = item.handlebars(item.data)
    }
})
.add('Templayed#render', function () {
    for (var i=0, len=bench.length; i<len; i++) {
        var item = bench[i]
        item.result = item.templayed(item.data)
    }
})
.add('lt#render', function () {
    for (var i=0, len=bench.length; i<len; i++) {
        var item = bench[i]
        item.result = item.lt(item.data)
    }
})
.on('cycle', function(event) {
    console.log(event.target.toString())
})
.run()

