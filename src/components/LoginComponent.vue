<script>
import { defineComponent, ref } from "@vue/runtime-core";
import { login, getUser } from "../service/auth";
import { useUserStore } from "../store/userStore";
import { useSnackbarStore } from "../store/snackbarStore";
import { useRouter } from "vue-router";
import { VTextField, VBtn } from "vuetify/components";

export default defineComponent({
  components: { VTextField, VBtn },
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
<template>
  <main>
    <div class="login-wrapper">
      <div class="left">
        <h1 class="title">CHATTER.IO</h1>
        <v-text-field v-model="username" label="Username"></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          @keyup.enter="loginHandler"
        ></v-text-field>
        <span class="smallText"><a>Forgot password?</a></span>
        <v-btn class="submit-button" @click="loginHandler" label="Log In!"
          >Log In!</v-btn
        >
        <span class="bottom-text"
          >Don't have an account? <a href="/register">Click here</a></span
        >
      </div>
      <div class="right">
        <img src="./icons/icon.png" class="icon" />
      </div>
    </div>
  </main>
</template>
<style scoped>
main {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #55aaff;
}
.title {
  margin-bottom: 25px;
  color: black;
  font-family: "Verdana";
}
.left {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.login-wrapper {
  -webkit-box-shadow: 9px 21px 41px -6px rgba(66, 68, 90, 1);
  -moz-box-shadow: 9px 21px 41px -6px rgba(66, 68, 90, 1);
  box-shadow: 9px 21px 41px -6px rgba(66, 68, 90, 1);
  width: 50vw;
  height: 40vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-left: 66px;
  color: white;
  background: rgba(127, 127, 127, 0.5);
  border-radius: 10px;
}
.submit-button {
  color: black;
}
.validInput {
  width: 75%;
  padding: 5px;
  margin: 5px;
  text-align: center;
}
a {
  cursor: pointer;
}
.smallText {
  font-size: 12px;
}
.right {
  margin-top: 20px;
  margin-right: 60px;
}
.icon {
  user-select: none;
  width: 100%;
  height: 100%;
}
.bottom-text {
  margin-top: 25px;
}
</style>
