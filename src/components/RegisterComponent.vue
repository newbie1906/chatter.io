<template>
  <main class="bg-grey-lighten-3">
    <div class="register-container">
      <v-container class="bg-blue-grey-lighten-5 login-wrapper py-10"
        ><h1 class="text-h-1 text-black mb-3">Welcome to Chatter.io</h1>
        <hr class="mb-5" />
        <v-row align="center">
          <v-col>
            <v-text-field
              color="primary"
              name="username"
              v-model="username"
              label="Username"
            ></v-text-field>
            <v-text-field
              color="primary"
              v-model="password"
              label="Password"
              type="password"
            ></v-text-field>
            <v-text-field
              color="primary"
              v-model="repeatedPassword"
              label="Repeated password"
              type="password"
            ></v-text-field>
            <v-text-field
              color="primary"
              v-model="email"
              label="E-mail"
              type="email"
            ></v-text-field>
            <v-checkbox
              color="primary"
              v-model="agree"
              label="Agree to the terms of use"
            ></v-checkbox>
          </v-col>
          <v-col> <img src="./icons/icon.png" class="icon" /></v-col
        ></v-row>
        <hr class="mb-5" />
        <div class="d-flex">
          <v-btn color="primary" class="mr-3" @click="handleSubmit"
            >Sign up</v-btn
          >
          <v-btn>Back to login</v-btn>
        </div>
      </v-container>
    </div>
  </main>
</template>

<script>
import { defineComponent, ref } from "vue";
import { register } from "../service/auth.js";
import { useRouter } from "vue-router";
import {
  VTextField,
  VBtn,
  VCheckbox,
  VContainer,
  VRow,
  VCol,
} from "vuetify/components";
import { useSnackbarStore } from "../store/snackbarStore";
export default defineComponent({
  components: { VTextField, VBtn, VCheckbox, VContainer, VRow, VCol },
  setup() {
    const snackbars = useSnackbarStore();
    const router = useRouter();
    const username = ref("");
    const password = ref("");
    const repeatedPassword = ref("");
    const email = ref("");
    const agree = ref(false);

    const handleSubmit = async () => {
      const user = {
        username: username.value,
        password: password.value,
        email: email.value,
      };
      try {
        await register(user);
        snackbars.pushSnackbar({
          title: "Success",
          color: "green",
          message: "You've signed up successfully",
        });
      } catch (error) {
        snackbars.pushSnackbar({
          title: "Error",
          color: "red",
          message: `There was a problem with your sign-up:\n ${error}`,
        });
        return;
      }
      router.push("/login");
    };
    return {
      handleSubmit,
      username,
      password,
      repeatedPassword,
      email,
      agree,
    };
  },
});
</script>

<style scoped>
main {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
h1 {
  font-family: "Verdana";
  font-weight: 700;
}
.login-wrapper {
  -webkit-box-shadow: 9px 21px 41px -6px rgba(66, 68, 90, 1);
  -moz-box-shadow: 9px 21px 41px -6px rgba(66, 68, 90, 1);
  box-shadow: 9px 21px 41px -6px rgba(66, 68, 90, 1);
  width: 40vw;
  min-width: 600px;
  padding-left: 66px;
  color: white;
  border-radius: 10px;
}
.icon {
  user-select: none;
  width: 80%;
  object-fit: contain;
}
</style>
