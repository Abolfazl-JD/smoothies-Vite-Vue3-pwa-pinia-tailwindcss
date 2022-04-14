import { defineStore } from "pinia";
import type {Smoothie} from '../types'

export const appData = defineStore({
  id: "smoothiesData",
  state: () => ({
    smoothies: [] as Smoothie[]
  }),
  getters: {},
  actions: {
    addSmoothie(newDrink : Smoothie) {
      this.smoothies.push(newDrink)
    }
  },
});
