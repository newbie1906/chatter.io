<script setup>
import SnackbarsDisplay from "./components/SnackbarsDisplay.vue";
import { getUser } from "./service/auth";
import { useRouter } from "vue-router";

const router = useRouter();
try {
  getUser();
} catch (e) {
  e.STATUS_CODE === 401 ? localStorage.removeItem("token") : console.log(e);
  router.push("/login");
}
</script>

<template>
  <router-view />
  <snackbars-display />
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
