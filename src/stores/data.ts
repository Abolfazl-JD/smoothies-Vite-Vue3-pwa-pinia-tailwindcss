import { defineStore } from "pinia";
import type {Smoothy} from '../types'

export const appData = defineStore({
  id: "smoothiesData",
  state: () => ({
    smoothies: [] as Smoothy[]
  }),
  getters: {},
  actions: {},
});
