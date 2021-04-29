import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { TodosType, TodoType, TodoTypeWithId } from '../models/todo.interface'
import { apiTodo } from '../utils/api'

@Module({
    namespaced: true,
    name: 'todo'
})
class TodoStore extends VuexModule {
    todos = [] as TodosType[]
    todo = {} as TodoType

    @Action
    async fetchAllTodo() {
        let todosData = [] as TodosType[]
        await apiTodo.get('todos').then((data: any) => {
            todosData = data.data
        })
        this.context.commit('setTodos', todosData)
    }
    @Action
    addTodo(payload: TodoType) {
        apiTodo.post('todos', payload).then((data: any) => {
            this.fetchAllTodo()
            console.log(data)
        })
    }
    @Action
    getTodoById(id: number) {
        apiTodo.get('todos/' + id).then((data: any) => {
            this.context.commit('setTodo', data.data)
        })
    }
    @Action
    updateTodo(payload: TodoTypeWithId) {
        apiTodo.put('todos/' + payload.id, payload).then((data: any) => {
            this.fetchAllTodo()
            console.log(data)
        })
    }
    @Action
    delTodoById(id: number) {
        apiTodo.del('todos/' + id).then((data: any) => {
            this.fetchAllTodo()
            console.log(data)
        })
    }

    @Mutation
    setTodos(todos: []) {
        this.todos = todos
    }
    @Mutation
    setTodo(todo: TodoType) {
        this.todo = Object.assign({}, todo)
    }
}

export default TodoStore