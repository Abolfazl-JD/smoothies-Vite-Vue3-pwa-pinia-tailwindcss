import { defineStore } from "pinia";
import type { Smoothie } from '../types'
import {indexedDb} from './indexedDB'


export const appData = defineStore({
  id: "smoothiesData",
  state: () => ({
    smoothies: [] as Smoothie[]
  }),
  getters: {},
  actions: {
    addSmoothie(newDrink : Smoothie) {
      this.smoothies.push(newDrink)
      const databaseStore = indexedDb()
      databaseStore.saveData(newDrink)
    },

    async getSmoothiesData() {
      const databaseStore = indexedDb()
      this.smoothies = await databaseStore.getSmoothiesStore()
    }
  },
})
