<script setup lang="ts">

// Не используется

type Task = {
  name: string
  completed: boolean
}

const props = defineProps<{
    task: Task
}>()

const emit = defineEmits<{
    (event: "changeStatus", value: { name: string, completed: boolean }): void
}>()

function onCheck(event: Event){
    const status = (event.target as HTMLInputElement).checked
    emit('changeStatus', { name: props.task.name, completed: status })
}
</script>

<template>
    <li>
        <span>
            <input 
                type="checkbox" 
                :checked="props.task.completed"
                @input="onCheck"
            />
            <span :class=" { 'completed' : props.task.completed } ">{{ props.task.name }}</span>
        </span>
    </li>
</template>

<style scoped>
    .completed {text-decoration: line-through;}
</style>