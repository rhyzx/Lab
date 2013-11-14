var bench = [{ // non
    source: 'Hello world',
    sourceJ: 'Hello world',
    data: {}
}, { // basic
    source: 'Hello {{name}}! You have {{count}} new messages.',
    sourceJ: 'Hello ${name}! You have ${count} new messages.',
    data:   { name: 'Mick', count: 30 }
}, { // if
    source: '{{#check}}pass{{/check}}',
    sourceJ: '{@if check}pass{@/if}',
    data:   { check: true }
}, { // use obj
    source: '{{#person}}{{name}}{{age}}{{/person}}',
    sourceJ: '{@if person}${person.name}${person.age}{@/if}',
    data:   { person: { name: 'Larry', age: 45 } }
}, { // iterator list
    source: '{{#names}}{{name}}{{/names}}',
    sourceJ: '{@each names as item}${item.name}{@/each}',
    data:   { names: [{name: 'Moe'}, {name: 'Larry'}, {name: 'Curly'}, {name: 'Shemp'}] }
}, { // invert
    source: '{{^not}}show me the money{{/not}}',
    sourceJ: '{@if not === false}show me the money{@/if}',
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
    sourceJ: (function () {/*
        <header>${header}</header>
        <ul>
        {@each items as item}
            <li>${item.name} : ${item.value}</li>
        {@/each}
        </ul>
        {@if footer}
        <footer>${footer}</footer>
        {@/if}
    */}).toString().slice(16, -4),
    data:   { header: 'this is header', items: [
        {name: 'a'}, {name: 'b'}, {name: 'c'}, {name: 'd'}, {name: 'e'},
        {name: 'a'}, {name: 'b'}, {name: 'c'}, {name: 'd'}, {name: 'e'},
        {name: 'a'}, {name: 'b'}, {name: 'c'}, {name: 'd'}, {name: 'e'}
    ]}
}]




var Mustache = require('mustache')
var lt = require('../lt')
var juicer = require('juicer')
juicer.set({ 'cache': false })

var Bench = require('benchmark')
var suite = new Bench.Suite

for (var i=0, len=bench.length; i<len; i++) {
    var item = bench[i]
    item.lt = lt.compile(item.source)
    item.juicer = juicer.compile(item.sourceJ)
    item.mustache = Mustache.compile(item.source)
}

suite
.add('Mustache#compile', function () {
    for (var i=0, len=bench.length; i<len; i++) {
        var item = bench[i]
        item.mustache = Mustache.compile(item.source)
        Mustache.clearCache()
    }
})
.add('juicer#compile', function () { // compile very fast??
    for (var i=0, len=bench.length; i<len; i++) {
        var item = bench[i]
        item.juicer = juicer.compile(item.sourceJ)
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
.add('juicer#render', function () {
    for (var i=0, len=bench.length; i<len; i++) {
        var item = bench[i]
        item.result = item.juicer.render(item.data)
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

