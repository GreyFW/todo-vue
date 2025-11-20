<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const errorMsg = ref('')

function handleLogin() {
  errorMsg.value = ''
  
  try {
    userStore.login(email.value, password.value)
    // Если всё успешно — идем на главную
    router.push('/')
  } catch (e) {
    errorMsg.value = e.message
  }
}
</script>

<template>
  <div class="auth-container">
    <h1>Вход</h1>
    <form @submit.prevent="handleLogin" class="auth-form">

      <input v-model="email" type="email" placeholder="email" required />

      <input v-model="password" type="password" placeholder="пароль" required />

      <p v-if="errorMsg" class="error">{{ errorMsg }}</p>

      <button type="submit" class="btn-auth">Войти</button>
      
      <p class="link-text">
        Нет аккаунта? <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </form>
  </div>
</template>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  text-align: center;
}
.auth-container h1 {
  margin-top: 0px;
  margin-bottom: 0px;
}
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
}
input {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
}
.btn-auth {
  background-color: #5482ff;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  transition: background 0.2s;
}
.btn-auth:hover {
  background-color: #3a63d1;
}
.error {
  color: #e74c3c;
  font-size: 0.9rem;
}
.link-text {
  margin-top: 10px;
  font-size: 0.9rem;
}
</style>