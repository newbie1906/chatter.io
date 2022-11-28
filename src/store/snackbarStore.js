import { defineStore } from "pinia";

export const useSnackbarStore = defineStore("snackbar", {
  state: () => {
    return {
      snackbarsQueue: [], // {message: string, title: string, color: string}[]
    };
  },
  getters: {
    getQueue: (state) => state.snackbarsQueue,
  },
  actions: {
    pushSnackbar(snackbar) {
      console.log(snackbar);
      this.snackbarsQueue.push(snackbar);
    },
    flushSnackbars() {
      this.snackbarsQueue = [];
    },
  },
});
