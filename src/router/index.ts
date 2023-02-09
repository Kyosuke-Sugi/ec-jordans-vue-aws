import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import StockView from "../views/StockView.vue";
import ContactView from "../views/ContactView.vue";
import PurchaseView from "../views/PurchaseView.vue";
import SignUpView from "../views/SignUpView.vue";

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
    {
      path: "/contact",
      name: "contact",
      component: ContactView
    },
    {
      path: "/purchase",
      name: "purchase",
      component: PurchaseView
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUpView
    },
  ],
});

export default router;
