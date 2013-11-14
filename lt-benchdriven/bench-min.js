var Bench = require('benchmark')
var suite = new Bench.Suite

// compiled function
var Template = function () {
    this.compiled = function () {
    var out = 'hello world'; return out
    }
}
Template.prototype.render = function (data) {
    this.stack = [data]
}

var template = new Template()


function lt(data) {
    template.render(data)
}
function tp(vars) {
vars = [vars]; var s = "hello world"; return s;
}    

var result = {}, data = {}
suite
.add('lt#direct-render', function () {
    result.lt = lt(data)
})
.add('templayed#direct-render', function () {
    result.tp = tp(data)
})
.on('cycle', function(event) {
    console.log(event.target.toString())
})
.run()

