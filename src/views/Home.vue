<template>
  <div class="home min-h-full bg-gray-100">
    <div class="flex flex-col">
      <div class="flex fixed lg:w-1/3 w-full bg-blue-200 p-6 justify-between z-10">
        Todo Apps
      </div>
      <div class="flex flex-col pt-24 overflow-auto">
        <div class="flex flex-col">
          <div class="flex text-gray-700 px-6 py-5 text-xl font-bold">Upcomming</div>
          <div
            class="flex items-center justify-between px-6 py-4 text-sm border-b border-gray-300 cursor-pointer">
            <div class="text-gray-700 text-lg font-semibold">
              Hehe
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <div class="flex text-gray-700 px-6 py-5 text-xl font-bold">Finished</div>
          <div
            class="flex items-center justify-between px-6 py-4 text-sm border-b border-gray-300 cursor-pointer">
            <div class="text-gray-700 text-lg font-semibold">
              Hehe
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  components: {},
})
export default class Home extends Vue {}
</script>
