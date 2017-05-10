angular.module('todo', [])
    .controller('todoCtrl', todoCtrl)
    .factory('todoService', dataService)

function todoCtrl(todoService) {
    var ctrl = this
    ctrl.todos = todoService.getTodos()

    ctrl.toggleFilter = function() {
        ctrl.todoFilter = ctrl.todoFilter? '' : {completed: false}
    }

    ctrl.todoFilter = {completed: false}

    ctrl.addTodo = function(title) {
        if(!title.length) return
        ctrl.todos = todoService.addTodo(title)
        ctrl.todoInput = ''
    }

    ctrl.removeTodo = function(id) {
        ctrl.todos = todoService.removeTodo(id)
    }

    ctrl.toggleComplete = function(id) {
        ctrl.todos = todoService.toggleComplete(id)
    }
}

function dataService() {
    var todos = []

    return {
        getTodos: getTodos,
        addTodo: addTodo,
        removeTodo: removeTodo,
        toggleComplete: toggleComplete
    }

    function getTodos() {
        return todos
    }

    function addTodo(content) {
        todos.push({
            id: Date.now(),
            content: content,
            completed: false
        })
        return todos
    }

    function removeTodo(id) {
        todos = todos.filter(todo => todo.id !== id)
        return todos
    }

    function toggleComplete(id) {
        todos.forEach(todo => {
            if(todo.id === id) todo.completed = !todo.completed
        })
        return todos
    }
}

angular.element(function() {
    angular.bootstrap(document, ['todo']);
});