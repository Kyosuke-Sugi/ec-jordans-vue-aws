import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import StockView from "../views/StockView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/cart",
      name: "cart",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/CartView.vue"),
    },
    {
      path: "/stock/:id",
      name: "stock",
      component: StockView
    },
  ],
});

export default router;
