import { defineStore } from "pinia";
import type { Smoothie } from '../types'
import {indexedDb} from './indexedDB'

export const appData = defineStore({
  id: "smoothiesData",
  state: () => ({
    smoothies: [] as Smoothie[],
    databaseStore : indexedDb()
  }),
  getters: {},
  actions: {
    addSmoothie(newDrink : Smoothie) {
      this.smoothies.push(newDrink)
      this.databaseStore.saveData(newDrink)
    },

    removeSmoothie(drink: Smoothie) {
      this.smoothies = this.smoothies.filter(smoothieItem => smoothieItem.id !== drink.id)
      this.databaseStore.deleteSmoothie(drink)
    },

    async getSmoothiesData() {
      this.smoothies = await this.databaseStore.getSmoothiesStore()
    }
  },
})
