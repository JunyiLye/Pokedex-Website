import { createRouter, createWebHistory } from "vue-router";
import MainPage from "./MainPage/MainPage.vue";
import Details from "./Details/Details.vue";

const routes = [
  {path : '/' , component: MainPage},
  {path:"/details/:id" , component:Details , props: true}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;