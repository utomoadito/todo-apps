import { createStore } from 'vuex'
import TodoStore from './todo'

export const store = createStore({
  modules: {
    todo: TodoStore
  }
})
