import { createRouter, createWebHistory } from 'vue-router'
import TodoPage from '../views/TodoPage.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import AboutPage from '../views/AboutPage.vue'

const routes = [
  { path: '/', name: 'Todo', component: TodoPage },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/register', name: 'Register', component: RegisterPage },
  { path: '/about', name: 'About', component: AboutPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router