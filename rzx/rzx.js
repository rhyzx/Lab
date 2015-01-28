var virtualDom = v
// var virtualDom = require('virtual-dom')

var h = virtualDom.h
var diff = virtualDom.diff
var patch = virtualDom.patch
var render = virtualDom.create

// =====
// Utils
var hasProp = {}.hasOwnProperty
function extend(parent, proto) {
  var child = hasProp.call(proto, 'constructor')
    ? proto.constructor
    : function () { parent.apply(this, arguments) }

  for (var key in parent) {
    if (hasProp.call(parent, key)) {
      child[key] = parent[key]
    }
  }

  function ctor() { this.constructor = child }
  ctor.prototype = parent.prototype
  child.prototype = new ctor()
  child.__super__ = parent.prototype

  for (var prop in proto) {
    child.prototype[prop] = proto[prop]
  }

  return child
}



// =========
// Component
var Component = extend(Object, {
  constructor: function Component(props) {
    this.subscribeRenderOn(new Rx.BehaviorSubject(props))
  },

  init: function () {
    // placeholder dom
    var tree = this._tree = h('span')
    var dom = subscribe(this, render(tree), tree)
    // TODO mount handler
    return dom
  },

  update: function (prev, dom) {
    // TODO mount handler
    prev.destroy()
    subscribe(this, dom, prev._tree)
  },

  destroy: function () {
    // TODO unmount handler
    unsubscribe(this)
  },
  
  render: function (state) {
    // TODO bind event `this` context
    // by override h() and bind all functions in props?
    return h('span', 'override me')
  },

  subscribeRenderOn: function (observable) {
    this._observable = observable
  },

  // TODO?
  toElement: function () {
    return render(this)
  },

  type: 'Widget'
})

Component.extend = function (proto) { return extend(this, proto) }


function subscribe(target, dom, prevTree) {
  target._subscription = target._observable
  .map(target.render, target)
  .subscribe(function (tree) {
    dom = patch(dom, diff(prevTree, tree))
    prevTree = target._tree = tree
  })
  return dom
}

function unsubscribe(target) {
  target._subscription.dispose()
}




// =============
// ReactiveModel
var ReactiveModel = extend(Rx.ReplaySubject, { // TODO BehaviorSubject?
  constructor: function ReactiveModel(value) {
    this.from(value)
  },

  from: function (value) {
    Rx.ReplaySubject.call(this, 1) // init
    this.onNext(value)
  },

  fromCallback: function (cb) {
    Rx.ReplaySubject.call(this, 1) // init
    cb(this.onNext.bind(this))
  },

  fromPromise: function (p) {
    Rx.ReplaySubject.call(this, 1) // init
    p.then(
      this.onNext.bind(this),
      this.onError.bind(this)
    )
  },

  // TODO? no return on cb()
  update: function (cb) {
    var self = this
    var subscription = self
    .observeOn(Rx.Scheduler.requestAnimationFrame)
    .map(cb)
    // TODO? async update
    // .selectMany(promise)
    .subscribe(function (newValue) {
      subscription.dispose()
      self.onNext(newValue)
    })
  },

  // TODO? remove this
  get: function (cb) {
    var self = this
    var subscription = self
    .subscribe(function (value) {
      subscription.dispose()
      cb(value)
    })
  }

  // TODO? copy()
})

ReactiveModel.extend = function (proto) { return extend(this, proto) }
// TODO? collection methods? Rx.combineLatest(models)?
// ReactiveModel.all()


var ReactiveCollection = extend(Rx.BehaviorSubject, {
  constructor: function ReactiveCollection() {

  },
  // pop
  // push
  // shift
  // unshift
  // remove(filter)
  // reset?
  // clear?
})


// exports
Rzx = {}
Rzx.Component = Component
Rzx.ReactiveModel = ReactiveModel
