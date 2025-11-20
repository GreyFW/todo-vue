<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMsg = ref('')

function handleRegister() {
    errorMsg.value = ''

    // Простая валидация
    if (!email.value || !password.value) {
        errorMsg.value = 'Заполните все поля'
        return
    }
    if (password.value.length < 4) {
        errorMsg.value = 'Пароль слишком короткий'
        return
    }
    if (password.value !== confirmPassword.value) {
        errorMsg.value = 'Пароли не совпадают'
        return
    }

    try {
        // Вызываем метод стора
        userStore.register(email.value, password.value)
        // Если ок — отправляем на логин
        router.push('/login')
    } catch (e) {
        errorMsg.value = e.message
    }
}
</script>

<template>
    <div class="auth-container">
        <h1>Регистрация</h1>
        <form @submit.prevent="handleRegister" class="auth-form">

            <div class="inputs-required">
                <div class="label-plus-input">
                    <label>Email</label>
                    <input v-model="email" type="email" placeholder="example@mail.com" required />
                </div>

                <div class="label-plus-input">
                    <label>Пароль</label>
                    <input v-model="password" type="password" placeholder="******" required />
                </div>

                <div class="label-plus-input">
                    <label>Повторите пароль</label>
                    <input v-model="confirmPassword" type="password" placeholder="******" required />
                </div>
            </div>

            <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
            <button type="submit" class="btn-auth">Создать аккаунт</button>
            <p class="link-text">
                Уже есть аккаунт? <router-link to="/login">Войти</router-link>
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
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    text-align: center;
}

.auth-container h1 {
    margin-top: 8px;
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
    border-radius: 12px;
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

.label-plus-input {
    display: flex;
    margin: 10px 0px 10px 0px;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
}
.label-plus-input label {
  margin-bottom: 8px;
}
.label-plus-input input {
    width: 100%;
    box-sizing: border-box;
}
</style>