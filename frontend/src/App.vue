<template>
  <HomePage />
</template>

<script>
import HomePageVue from './pages/HomePage.vue'

// Style library
import "spectre.css";

export default {
  name: 'App',
  components: {
    HomePage: HomePageVue
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
