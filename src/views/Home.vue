<template>
  <div class="home min-h-full bg-gray-100">
    <div class="flex flex-col">
      <div class="flex fixed lg:w-1/3 w-full bg-blue-200 p-6 justify-between z-10">
        Todo Apps
        <input 
          v-model="search"
          class="w-full h-10 px-3 text-base placeholder-gray-600 border focus:shadow-outline" 
          type="text" placeholder="Cari"/>
      </div>
      <div class="flex flex-col pt-24 overflow-auto">
        <div class="flex text-gray-700 px-6 py-5 text-xl font-bold">Upcomming</div>
        <div
          v-for="(todo, index) in todoByStatus.upcomming" :key="index"
          @click="onTodoModal(todo.id)"
          class="flex items-center justify-between px-6 py-4 text-sm border-b border-gray-300 cursor-pointer hover:bg-gray-200">
          <div class="text-gray-700 text-lg font-semibold">
            {{ todo.task }}
          </div>
        </div>
        <div class="flex text-gray-700 px-6 py-5 text-xl font-bold">Finished</div>
        <div
          v-for="(todo, index) in todoByStatus.finish" :key="index"
          @click="onTodoModal(todo.id)"
          class="flex items-center justify-between px-6 py-4 text-sm border-b border-gray-300 cursor-pointer hover:bg-gray-200">
          <div class="text-gray-700 text-lg font-semibold">
            {{ todo.task }}
          </div>
        </div>
      </div>
      <div class="flex fixed bottom-0 lg:w-1/3 w-full">
        <button
          @click="onTodoModal()" 
          class="absolute bottom-8 right-8 h-16 w-16 rounded-full bg-blue-600 hover:bg-blue-800 z-10 focus:outline-none">
          <span class="text-white text-2xl">+</span>
        </button>
      </div>
    </div>
    <form-modal 
      @onClickCancel="onCancel"
      :modal="modal" :todoId="todoId" :todo="todo" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { namespace } from 'vuex-class'
import { getModule } from 'vuex-module-decorators'
import FormModal from '../components/FormModal.vue'
import { TodosType, TodoType } from '../models/todo.interface'
import { store } from '../store'
import todo from '../store/todo'

const todoStore = namespace('todo')

@Options({
  name: 'Home',
  components: {
    FormModal
  },
  // We can use this if still not familiar with class component
  data() {
    return {}
  },
  methods: {}
})
export default class Home extends Vue {
  @todoStore.State todos!: Array<TodosType>
  @todoStore.State todo!: TodoType
  @todoStore.Action fetchAllTodo!: () => void
  @todoStore.Action getTodoById!: (id: number) => void
  @todoStore.Mutation setTodo!: (payload: TodoType) => void

  msg = 'Hello'
  modal = false
  todoId = 0
  search = ''

  created() {
    getModule(todo, store)
    if (this.todos?.length <= 0) {
      this.fetchAllTodo()
    }
  }

  get todoByStatus() {
    let todos = this.todos
    let finish: Array<TodosType> = [], upcomming: Array<TodosType> = []
    todos = todos.filter(data => {
      return data.task.toLowerCase().includes(this.search.toLowerCase()) || data.status.toString().includes(this.search.toLowerCase())
    })
    todos.map(todo => {
      if (todo.status) finish.push(todo)
      else upcomming.push(todo)
    })
    return { finish, upcomming }
  }

  onTodoModal(id = 0): void {
    this.todoId = id
    if (this.todoId > 0) {
      this.getTodoById(this.todoId)
    }
    this.modal = true
  }

  onCancel(val: boolean): void {
    this.modal = val
    this.todoId = 0
    this.setTodo({task: '', status: false})
  }
}
</script>
