import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { TodosType } from '../models/todo.interface'
import { apiTodo } from '../utils/api'

@Module({
    namespaced: true,
    name: 'todo'
})
class TodoStore extends VuexModule {
    todos = [] as TodosType[]

    @Action
    async fetchAllTodo() {
        let todosData = [] as TodosType[]
        await apiTodo.get('todos').then((data: any)=> {
            todosData = data.data
        })
        this.context.commit('setTodos', todosData)
    }

    @Mutation
    setTodos(todos: []) {
        this.todos = todos
    }
}

export default TodoStore