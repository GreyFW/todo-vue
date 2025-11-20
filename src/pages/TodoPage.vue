<script setup>
import Header from '../components/Header.vue'
import TodoList from '../components/TodoList.vue'
import TodoDetails from '../components/TodoDetails.vue'
import DeleteModal from '../components/DeleteModal.vue'

import { ref, reactive, computed, onMounted } from 'vue'

const completed = ref([])
const selectedTaskId = ref(null)
const modal = reactive({ open: false, id: null, fromList: null })
const tasks = ref([
  {
    id: 1,
    title: "todo1",
    completed: false,
    subtasks: [],
    notes: [],
    timeSpent: 0,
  },
  {
    id: 2,
    title: "todo2",
    completed: false,
    subtasks: [],
    notes: [],
    timeSpent: 0,
  }
])

function addTask(title) {
  const newTask = {
    id: Date.now(),
    title,
    completed: false,
    subtasks: [],
    notes: [],
    timeSpent: 0
  }
  tasks.value.push(newTask)
  selectedTaskId.value = newTask.id
  save()
}

function selectTask(id) {
  selectedTaskId.value = id
}

function showDeleteModal(id, fromList = 'tasks') {
  modal.open = true
  modal.id = id
  modal.fromList = fromList
}

function confirmDelete() {
  if (modal.fromList === 'tasks') {
    const idx = tasks.value.findIndex(t => t.id === modal.id)
    if (idx !== -1) tasks.value.splice(idx, 1)
  } else {
    const idx = completed.value.findIndex(t => t.id === modal.id)
    if (idx !== -1) completed.value.splice(idx, 1)
  }
  
  // Если удаляем выбранную задачу, сбрасываем выбор
  if (selectedTaskId.value === modal.id) {
    selectedTaskId.value = null
  }
  
  modal.open = false
  modal.id = null
  modal.fromList = null
  save()
}

function closeDeleteModal() {
  modal.open = false
  modal.id = null
  modal.fromList = null
}

function toggleComplete(id) {
  const idx = tasks.value.findIndex(t => t.id === id)
  if (idx !== -1) {
    const task = tasks.value[idx]
    task.completed = true
    completed.value.push(task)
    tasks.value.splice(idx, 1)
    
    // Если завершаем выбранную задачу, сбрасываем выбор
    if (selectedTaskId.value === id) {
      selectedTaskId.value = null
    }
    
    save()
  }
}

function uncompleteTask(id) {
  const idx = completed.value.findIndex(t => t.id === id)
  if (idx !== -1) {
    const task = completed.value[idx]
    task.completed = false
    tasks.value.push(task)
    completed.value.splice(idx, 1)
    save()
  }
}

const currentTask = computed(() => {
  const all = [...tasks.value, ...completed.value];
  return all.find(t => t.id === selectedTaskId.value) || null;
});

function save() {
  localStorage.setItem('tasks', JSON.stringify(tasks.value))
  localStorage.setItem('completed', JSON.stringify(completed.value))
}

function loadFromStorage() {
  if (localStorage.getItem('tasks')) {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'))
    tasks.value.splice(0, tasks.value.length, ...storedTasks);
  }
  if (localStorage.getItem('completed')) {
    const storedCompleted = JSON.parse(localStorage.getItem('completed'))
    completed.value.splice(0, completed.value.length, ...storedCompleted);
  }
}

onMounted(() => {
  loadFromStorage()
})
</script>

<template>
  <Header @add="addTask" />
  <div class="board">
    <!-- Tasks -->
    <div class="card" id="todo-list">
      <h2 class="card__title">Tasks</h2>
      <TodoList
        :tasks="tasks"
        :selectedTaskId="selectedTaskId"
        @select="selectTask"
        @remove="showDeleteModal"
        @toggle="toggleComplete"
      />
    </div>

    <!-- Current Task -->
    <div class="card">
      <TodoDetails 
        v-if="currentTask" 
        :task="currentTask" 
        @update="save" 
      />
      <div v-else class="no-task-selected" id="no-task-selected">
        Choose or create a task
      </div>
    </div>

    <!-- Done -->
    <div class="card" id="done-list">
      <h2 class="card__title">Done</h2>
      <TodoList
        :tasks="completed"
        :selectedTaskId="selectedTaskId"
        @select="selectTask"
        @remove="id => showDeleteModal(id, 'completed')"
        @toggle="uncompleteTask"
      />
    </div>

    <!-- Модалка -->
    <DeleteModal
      :isOpen="modal.open"
      @confirm="confirmDelete"
      @close="closeDeleteModal"
    />
  </div>
</template>

<style>
@import "../scss/main.scss";
</style>