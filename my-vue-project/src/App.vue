<script setup lang="ts">
import { ref } from "vue";
import ToDoItem from "./components/ToDoItem.vue";

const tasks = ref<{name: string, completed: boolean}[]>([
  { name: 'Задача 1', completed: false },
  { name: 'Задача 2', completed: false },
  { name: 'Задача 3', completed: false },
])

const inputValue = ref<string>('')

function onClick(){
  if(!inputValue.value){
    return
  }
  tasks.value.push({name: inputValue.value, completed: false})
  inputValue.value = ''
}

function onChangeStatus(value: { name: string, completed: boolean }){
  const idx = tasks.value.findIndex(t => t.name === value.name)
  tasks.value[idx].completed = value.completed
}
</script>

<template>
  <input type="text" v-model='inputValue'>
  <button @click="onClick">Добавить задачу</button>

  <hr>

  <ul>
    <ToDoItem 
      v-for="task in tasks"
      :key="task.name" 
      :task="task"
      @change-status="onChangeStatus"
      ></ToDoItem>
  </ul>
</template>

<style scoped>
  ul {list-style-type: none;}
</style>
