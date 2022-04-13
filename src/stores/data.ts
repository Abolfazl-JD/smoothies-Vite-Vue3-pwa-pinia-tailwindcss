import { defineStore } from "pinia";

export const appData = defineStore({
  id: "smoothiesData",
  state: () => ({
    smoothies : []
  }),
  getters: {},
  actions: {},
});
