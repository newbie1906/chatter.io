<template>
  <concentrated-layout title="Welcome to Chatter.io">
    <template #default>
      <v-text-field
        color="primary"
        name="username"
        v-model="username"
        label="Username"
      ></v-text-field>
      <v-text-field
        color="primary"
        name="password"
        v-model="password"
        label="Password"
        type="password"
      ></v-text-field>
      <v-text-field
        color="primary"
        name="repeatedPassword"
        v-model="repeatedPassword"
        label="Repeated password"
        type="password"
      ></v-text-field>
      <v-text-field
        color="primary"
        v-model="email"
        name="email"
        label="E-mail"
        type="email"
      ></v-text-field>
      <v-checkbox
        color="primary"
        v-model="agree"
        label="Agree to the terms of use"
      ></v-checkbox> </template
    ><template #actions
      ><div class="d-flex">
        <v-btn color="primary" class="mr-3" @click="handleSubmit"
          >Sign up</v-btn
        >
        <link-to to="/login"> <v-btn>Back to login</v-btn></link-to>
      </div>
    </template>
  </concentrated-layout>
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
import ConcentratedLayout from "./ConcentratedLayout.vue";
import LinkTo from "./LinkTo.vue";

export default defineComponent({
  components: {
    VTextField,
    VBtn,
    VCheckbox,
    VContainer,
    VRow,
    VCol,
    LinkTo,
    ConcentratedLayout,
  },
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

<style scoped></style>
