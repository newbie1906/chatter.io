<template>
  <v-snackbar
    v-for="(snackbar, index) in currentSnackbars"
    :key="index"
    :timeout="2000"
    :style="{ bottom: index * 200 }"
    location="bottom right"
    model-value
    :color="snackbar.color"
    multi-line
  >
    <div class="text-h5">{{ snackbar.title }}</div>
    <div class="text-body-2">{{ snackbar.message }}</div>
  </v-snackbar>
</template>

<script>
import { defineComponent, ref } from "vue";
import { VSnackbar } from "vuetify/components";
import { useSnackbarStore } from "../store/snackbarStore";

export default defineComponent({
  components: { VSnackbar },
  setup() {
    const currentSnackbars = ref([]);
    const snackbars = useSnackbarStore();
    snackbars.$onAction(({ name }) => {
      if (name === "pushSnackbar") {
        const queue = snackbars.snackbarsQueue;
        currentSnackbars.value.push(
          ...queue.map((s) => ({ ...s, active: true }))
        );
        snackbars.flushSnackbars();
        setTimeout(() => {
          currentSnackbars.value = currentSnackbars.value.slice(queue.length);
        }, 5000);
      }
    });

    return { currentSnackbars };
  },
});
</script>

<style scoped></style>
