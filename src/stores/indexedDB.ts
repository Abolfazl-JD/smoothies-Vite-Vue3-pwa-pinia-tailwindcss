import { defineStore } from "pinia"
import type {Smoothie} from '../types'

export const indexedDb = defineStore({
  id: "database",
  state: () => ({
    database: null as null | IDBDatabase
  }),
  getters: {},
  actions: {
    async getDatabase() : Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
          if (this.database) {
            resolve(this.database)
          }
  
          let request = window.indexedDB.open('smoothiesDB', 1)
          request.onerror = event => {
            console.error('ERROR: unable to open the database', event)
            reject('ERROR')
          }
          request.onsuccess = () => {
            this.database = request.result
            resolve(this.database)
          }
  
          request.onupgradeneeded = (event) => {
            let database = request.result
            database.createObjectStore('smoothies', {
              autoIncrement: true,
              keyPath : 'id'
            })
          }
        })
      },
  
      async getSmoothiesStore() : Promise<Smoothie[]>{
        this.database = await this.getDatabase()
        return new Promise((resolve, reject) => {
          if (this.database) {
            const transaction = this.database.transaction('smoothies', 'readonly')
            const store = transaction.objectStore('smoothies')
  
            let smoothies : Smoothie[] = [] 
            store.openCursor().onsuccess = (event: any) => {
              const cursor = event.target.result
              if (cursor) {
                const drink : Smoothie = cursor.value
                smoothies.push(drink)
                cursor.continue()
              }
            }
  
            transaction.oncomplete = () => {
              resolve(smoothies)
            }
            transaction.onerror = (event) => {
              reject(event)
            }
          }
        })
      },
  
      async saveData(drink : Smoothie) {
        this.database = await this.getDatabase()
        return new Promise((resolve, reject) => {
          if (this.database) {
            const transaction = this.database.transaction('smoothies', 'readwrite')
            const store = transaction.objectStore('smoothies')
              store.put({
                  title: drink.title,
                  id: drink.id,
                  ingredients : [...drink.ingredients]
            })
  
            transaction.oncomplete = () => {
              resolve('item has been successfully saved')
            }
            transaction.onerror = (event) => {
              reject(event)
            }
          }
  
        })
      },
  
      async deleteSmoothie(drink: Smoothie) {
        this.database = await this.getDatabase()
  
        return new Promise((resolve, reject) => {
          if (this.database) {
            const transaction = this.database.transaction('smoothies', 'readwrite')
            const store = transaction.objectStore('smoothies')
            store.delete(drink.id)
  
            transaction.oncomplete = () => {
              resolve('item has been successfully deleted')
            }
            transaction.onerror = (event) => {
              reject(event)
            }
          }
        })
      },
  },
})