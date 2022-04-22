import { createRouter, createWebHistory } from "vue-router"
import SmoothiesView from "../views/smoothiesView.vue"
import AddSmoothie from '../views/addSmoothie.vue'
import EditSmoothie from '../views/EditSmoothie.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "smoothies",
      component: SmoothiesView,
    },
    {
      path: "/add-smoothie",
      name: "add-smoothie",
      component: AddSmoothie,
    },
    {
      path: "/smoothies/:name",
      name: "edit-smoothie",
      component: EditSmoothie,
      props : true
    }
  ]
})

export default router
