<script setup>
import { useUserStore } from './stores/user'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const router = useRouter()

const { currentUser } = storeToRefs(userStore)

function handleLogout() {
  userStore.logout()
  router.push('/login')
}
</script>

<template>
  <header>
    <nav>
      <router-link to="/">todo</router-link>
      <router-link to="/about">about</router-link>

      <!-- Не авторизован: -->
      <template v-if="!currentUser">
        <router-link to="/login">log-in</router-link>
        <router-link to="/register">register</router-link>
      </template>
      <template v-else>
        <span class="user-email">{{ currentUser.email }}</span>
        <a href="#" @click.prevent="handleLogout" class="logout-btn">logout</a>
      </template>
    </nav>
  </header>

  <main>
    <!-- подстановка страниц -->
    <router-view />
  </main>
</template>

<style scoped>
nav {
  padding: 4px;
  text-align: center;
  background-color: #5482ff;
  border-bottom: 4px solid #98b6ff;
  display: flex;
  justify-content: center;
  align-items: center;
}

nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  padding: 14px;
}

nav a.router-link-active {
  color: #163ba1;
  background-color: #98b6ff;
  padding: 5px 10px;
  border-radius: 999px;
  border: 2px solid #ccdaff;
  border-bottom: 2px solid #163ba1;
  border-left: 2px solid #163ba1;
}

.user-email {
  color: white;
  margin-left: 32px;
  margin-right: 10px;
  font-size: 1rem;
  opacity: 0.9;
}
.logout-btn {
  cursor: pointer;
  border: 2px solid rgba(255, 0, 0, 0.25);
  border-radius: 8px;
  padding: 5px 10px !important;
}
.logout-btn:hover {
  background: rgba(255, 0, 0, 0.5);
}
</style>