

## Name
- rzx
- rex
- reax
- zinc

Cross-Component Model(Reactive)




## React Rocks

- Custom element support
- Server-side pre-rendering


## Riot Rocks

- Webcomponent like definition
- Small




## Rails

?
```
/assets/components
|- foo
||- foo.scss
||- foo.view.js
||- foo.controller.js
|- bar
```



## How Rzx works

```js
// create a reactive model by Rxjs
var foo = new Rx.ReplaySubject(1)

setTimeout(function () {
  // emit data
  foo.onNext(5)
}, 1000)



var render = function (data) {
  return virtualDom.h('button', {
    onclick: function () {
      // update data
      foo.onNext(data + 1)
    }
  }, data + '')
}


// bind model to render
// create and patch dom by virtual-dom
var node
var oldVtree
foo.subscribe(function (data) {
  var vtree = render(data)
  if (!node) {
    node = virtualDom.create(vtree)
    document.getElementById('foo-container').appendChild(node)
  } else {
    var patches = virtualDom.diff(oldVtree, vtree)
    node = virtualDom.patch(node, patches)
  }
  oldVtree = vtree
})
```



## Improvement

- Rx error stacktrace
