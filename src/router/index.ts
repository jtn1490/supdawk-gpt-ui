import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard/dashboard.vue";
import Signup from "../views/Signup/signup.vue";
import Login from "../views/Login/login.vue";
import store from "../store";
import supDawkApiClient from "@/utils/httpClients/supdawkApiClient";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Dashboard,
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          component: Dashboard,
        },
      ],
      meta: { requiresAuth: true },
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup,
      meta: { requiresAuth: false },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: { requiresAuth: false },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const { requiresAuth } = to.meta;
  if (requiresAuth) {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      next("/login");
    } else {
      try {
        await supDawkApiClient.post(
          `/api/v1/authentication/authenticate`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        next();
      } catch (e) {
        next("/login");
      }
    }
  } else {
    next();
  }
});

export default router;
