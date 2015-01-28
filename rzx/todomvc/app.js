var ENTER_KEY = 13
var ESC_KEY = 27


var Todo = Rzx.ReactiveModel.extend({
  save: function () {

  }
})
Todo.all = function () {
  // localStorage.setItem('todos-knockoutjs', ko.toJSON(this.todos));
  var $todos = new Rzx.ReactiveModel([])
  setTimeout(function () {
    var res = JSON.parse( localStorage.getItem('todos') )
    if (res && res.length) {
      $todos.update(function () {
        return res.map(function (value) {
          return new Todo(value)
        })
      })
    }
  }, 100) // simulate async
  return $todos
}


var TodoHeader = Rzx.Component.extend({
  constructor: function (props) {
    this.$todos = props.$todos
    this.$newTodo = new Todo({title: ''})
    this.subscribeRenderOn(this.$newTodo)
  },
  onInput: function (evt) {
    this.$newTodo.update(function (todo) {
      todo.title = evt.target.value
      return todo
    })
  },
  onKeyup: function (evt) {
    // TODO? Rx.fromEvent
    if (evt.keyCode === ENTER_KEY) {
      var $todos = this.$todos
      this.$newTodo.update(function (newTodo) {
        // TODO? opt this
        var title = newTodo.title
        $todos.update(function (todos) {
          todos.push(new Todo({title: title}))
          return todos
        })
        newTodo.title = ''
        return newTodo
      })
    } else if (evt.keyCode === ESC_KEY) {
      this.$newTodo.update(function (newTodo) {
        newTodo.title = ''
        return newTodo
      })
    }
  },
  render: function (newTodo) {
    return h('header#header', [
      h('h1', 'todos'),
      h('input#new-todo', {
        placeholder: 'What needs to be done?',
        autofocus: true,
        value: newTodo.title,
        onkeyup: this.onKeyup.bind(this),
        oninput: this.onInput.bind(this)
      })
    ])
  }
})

var TodoFooter = Rzx.Component.extend({
  constructor: function (props) {
    this.$todos = props.$todos
    // TODO props.$filter
    // TODO opt this
    this.subscribeRenderOn(props.$todos.selectMany(function (todos) {
      if (todos.length < 1) {
        return new Rx.BehaviorSubject({
          completedCount: 0,
          activeCount: 0
        })
      }
      return Rx.Observable.combineLatest(todos, function () {
        var rawTodos = [].slice.call(arguments)
        var completedCount = rawTodos.reduce(function (count, todo) {
          if (todo.completed) {
            count++
          }
          return count
        }, 0)

        return {
          completedCount: completedCount,
          activeCount: rawTodos.length - completedCount
        }
      })
    }))
  },
  onClickClear: function () {
    // OPT here
    // TIP collection update
    var $todos = this.$todos
    var subscription = $todos
    .observeOn(Rx.Scheduler.requestAnimationFrame)
    .subscribe(function (todos) {
      subscription.dispose()

      if (todos.length < 1) return
      var sub = 
      Rx.Observable.combineLatest(todos, function () {
        return [].map.call(arguments, function (todo) {
          return todo.completed
        })
      })
      .observeOn(Rx.Scheduler.requestAnimationFrame)
      .subscribe(function (completedIndexs) {
        sub.dispose()

        $todos.update(function (todos) {
          return todos.filter(function ($todo, i) {
            return !completedIndexs[i]
          })
        })
      })
    })
  },
  render: function (info) {
    return h('footer#footer', [
      h('span#todo-count', [
        h('strong', '' + info.activeCount),
        (info.activeCount > 1 ? ' items' : ' item') + ' left'
      ]),

      h('ul#filters', [
        h('li', h('a', {href: '#/'}, 'All')),
        h('li', h('a', {href: '#/active'}, 'Active')),
        h('li', h('a', {href: '#/completed'}, 'Completed'))
      ]),

      h('button#clear-completed', {
        onclick: this.onClickClear.bind(this),
      }, 'Clear completed (' + info.completedCount + ')')
    ])
  }
})

var TodoItem = Rzx.Component.extend({
  constructor: function (props) {
    this.subscribeRenderOn(props.$todo)
    this.$todo = props.$todo
    this.$todos = props.$todos

    this.editing = false
    this.prevTitle = ''
  },
  onClickToggle: function (evt) {
    this.$todo.update(function (todo) {
      todo.completed = evt.target.checked
      return todo
    })
  },
  onClickDestroy: function () {
    var $todo = this.$todo
    this.$todos.update(function (todos) {
      return todos.filter(function ($item) {
        return $item !== $todo
      })
    })
  },
  onInput: function (evt) {
    this.$todo.update(function (todo) {
      todo.title = evt.target.value
      return todo
    })
  },
  onKeyup: function (evt) {
    if (evt.keyCode === ENTER_KEY) {
      this.doneEditing()
    } else if (evt.keyCode === ESC_KEY) {
      this.cancelEditing()
    }
  },
  startEditing: function () {
    var self = this
    this.$todo.update(function (todo) {
      self.prevTitle = todo.title
      self.editing = true
      return todo
    })
  },
  doneEditing: function () {
    var self = this
    this.$todo.update(function (todo) {
      self.editing = false
      return todo
    })
  },
  cancelEditing: function () {
    var self = this
    this.$todo.update(function (todo) {
      self.editing = false
      todo.title = self.prevTitle
      return todo
    })
  },
  render: function (todo) {
    return h('li', {
      className: (todo.completed ? 'completed ' : '')
        + (this.editing ? 'editing ' : '')
    }, [
      h('div.view', [
        h('input.toggle', {
          type: 'checkbox',
          checked: todo.completed,
          onclick: this.onClickToggle.bind(this)
        }),
        h('label', {
          ondblclick: this.startEditing.bind(this)
        }, todo.title),
        h('button.destroy', {onclick: this.onClickDestroy.bind(this)})
      ]),
      h('input.edit', {
        value: todo.title,
        onblur: this.doneEditing.bind(this),
        onkeyup: this.onKeyup.bind(this),
        oninput: this.onInput.bind(this),
        autofocus: this.editing // TODO add render handler for virutal-dom
      })
    ])
  }
})

var TodoMain = Rzx.Component.extend({
  constructor: function (props) {
    this.subscribeRenderOn(props.$todos)
  },
  // TODO toggle all
  render: function (todos) {
    return h('section#main', [
      h('input#toggle-all', {type: 'checkbox'}),
      h('label', {attributes: {for: 'toggle-all'}}, 'Mark all as complete'),
      h('ul#todo-list', todos.map(function ($todo) {
        return new TodoItem({$todo: $todo, $todos: $todos})
      }))
    ])
  }
})


var TodoApp = Rzx.Component.extend({
  constructor: function (props) {
    this.subscribeRenderOn(new Rx.BehaviorSubject(props))

    this.$todos = props.$todos
    var $filter = this.$filter = new Rzx.ReactiveModel('all')
    var router = Router({
      '/': function () { $filter.update(function () { return 'all' }) },
      '/:filter': function (filter) { $filter.update(function () { return filter }) }
    })
    router.init()
    // TODO deinit router
  },
  render: function (props) {
    return h('div', [
      new TodoHeader({$todos: this.$todos}),
      new TodoMain({$todos: this.$todos, $filter: this.$filter}),
      new TodoFooter({$todos: this.$todos, $filter: this.$filter})
    ])
  }
})

var $todos = Todo.all()
var todoApp = new TodoApp({$todos: $todos})
document.getElementById('todoapp').appendChild( todoApp.toElement() )
