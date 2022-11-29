<template>
  <concentrated-layout title="Login">
    <template #default>
      <v-text-field v-model="username" label="Username"></v-text-field>
      <v-text-field
        v-model="password"
        label="Password"
        type="password"
        @keyup.enter="loginHandler"
      ></v-text-field>
    </template>
    <template #actions>
      <div class="smallText mb-4"><a>Forgot password?</a></div>
      <v-btn class="submit-button" @click="loginHandler" label="Log In!"
        >Log In!</v-btn
      >
      <div class="bottom-text mt-4">
        Don't have an account? <a href="/register">Click here</a>
      </div>
    </template>
  </concentrated-layout>
</template>

<script>
import { defineComponent, ref } from "@vue/runtime-core";
import { login, getUser } from "../service/auth";
import ConcentratedLayout from "./ConcentratedLayout.vue";
import { useSnackbarStore } from "../store/snackbarStore";
import { useRouter } from "vue-router";
import { VTextField, VBtn } from "vuetify/components";

export default defineComponent({
  components: { VTextField, VBtn, ConcentratedLayout },
  setup() {
    const snackbars = useSnackbarStore();
    const router = useRouter();
    const username = ref("");
    const password = ref("");

    const loginHandler = async () => {
      const user = {
        username: username.value,
        password: password.value,
      };
      try {
        const { data } = await login(user);
        localStorage.setItem("token", `${data.access_token}`);
        const userData = await getUser();
        router.push("/");
        snackbars.pushSnackbar({
          title: `Welcome back ${userData.username}`,
          color: "green",
          message: "",
        });
      } catch (error) {
        if (error.response.status === 422) {
          snackbars.pushSnackbar({
            title: "Error",
            color: "red",
            message: `There was some issue with logging you:\n ${error}`,
          });
        }
      }
    };
    return {
      username,
      password,
      loginHandler,
    };
  },
});
</script>
<style scoped>
.submit-button {
  color: black;
}
.smallText {
  font-size: 12px;
}
.bottom-text {
  margin-top: 25px;
}
</style>
