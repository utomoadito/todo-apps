<template>
  <div class="FormModal">
    <transition
      enter-active-class="ease-out duration-300"
      enter-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="ease-in duration-200"
      leave-class="opacity-100"
      leave-to-class="opacity-0">
      <div v-if="modal" class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 transition-opacity" aria-hidden="true">
              <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <transition
              enter-active-class="ease-out duration-300"
              enter-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to-class="opacity-100 translate-y-0 sm:scale-100"
              leave-active-class="ease-in duration-200"
              leave-class="opacity-100 translate-y-0 sm:scale-100"
              leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" >
              <div 
                v-if="modal" 
                class="inline-block align-bottom bg-white text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" 
                role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div class="p-3">
                  <form @submit.prevent="onSubmit">
                    <div class="flex flex-col overflow-auto mb-8">
                      <div class="text-gray-700 mb-2">
                        <label class="block mb-1 font-semibold text-lg" for="task">Nama Task</label>
                        <input 
                          v-model="todo.task"
                          class="w-full h-10 px-3 text-base placeholder-gray-600 border focus:shadow-outline" 
                          type="text" placeholder="Tulis task mu disini" id="task"/>
                      </div>
                      <div class="text-gray-700 mb-2">
                        <label class="block mb-1 font-semibold text-lg" for="status">Status</label>
                        <div class="relative inline-block w-full text-gray-700">
                          <select 
                            v-model="todo.status" id="status"
                            class="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border appearance-none focus:shadow-outline">
                            <option :value="false">Sedang Dikerjakan</option>
                            <option :value="true">Selesai</option>
                          </select>
                          <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      class="mt-5 text-sm font-semibold bg-green-600 w-full text-white px-6 py-3 shadow-xl hover:text-white hover:bg-green-800">
                      Kirim
                    </button>
                  </form>
                  <button 
                    v-if="todoId > 0"
                    @click="onDelete"
                    class="mt-5 text-sm font-semibold bg-red-600 w-full text-white px-6 py-3 shadow-xl hover:text-white hover:bg-red-800">
                    Hapus
                  </button>
                  <button 
                    @click="onClickCancel"
                    class="mt-5 text-sm font-semibold bg-gray-400 w-full text-white px-6 py-3 shadow-xl hover:text-white hover:bg-gray-600">
                    Batal
                  </button>
                </div>
              </div>
            </transition>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { TodoType } from '../models/todo.interface'

const todoStore = namespace('todo')

@Options({
  name: 'FormModal',
  props: {
    modal: Boolean
  }
})
export default class FormModal extends Vue {
  @Prop() readonly todo!: TodoType
  @Prop() readonly todoId!: number
  @todoStore.Action addTodo!: (payload: TodoType) => void
  @todoStore.Action updateTodo!: (payload: TodoType) => void
  @todoStore.Action delTodoById!: (id: number) => void
  
  onClickCancel(): void {
    this.$emit('onClickCancel', false)
  }

  onSubmit(): void {
    let payload: any = {
      task: this.todo.task,
      status: this.todo.status
    }
    if (this.todoId > 0) {
      payload.id = this.todoId
      this.updateTodo(payload)
    } else {
      this.addTodo(payload)
    }
    this.onClickCancel()
  }

  onDelete(): void {
    this.delTodoById(this.todoId)
    this.onClickCancel()
  }
}
</script>
