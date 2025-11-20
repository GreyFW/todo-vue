<script setup>
//  логика проверки авторизации / нав  меню
</script>

<template>
  <header>
    <nav>
      <!-- Временная навигация для проверки -->
      <router-link to="/">todo</router-link>  
      <router-link to="/login">log-in</router-link>  
      <router-link to="/register">register</router-link>  
      <router-link to="/about">about</router-link>  
    </nav>
  </header>

  <main>
    <!-- подстановка страниц -->
    <router-view />
  </main>
</template>

<style scoped>
nav {
  padding: 14px;
  text-align: center;
  background-color: #5482ff;
  border-bottom: 4px solid #98b6ff;
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
}
</style>