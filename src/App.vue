<script setup>
import { getUser } from './service/auth';

getUser();

//localStorage.setItem('user', JSON.stringify({id: 1, name: 'John Doe', token: 'token'}))
</script>

<template>
  <router-view />
</template>

<style>
#app {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  min-height: 100vh;
  display: flex;
}
</style>
