import { createWebHistory, createRouter } from "vue-router";
//import Layout from "@/views/Layout.vue"
import About from "@/views/About.vue";
import Home from "@/views/Home.vue";
import Login from "@/views/Login"
import Praticien from "@/views/Praticien"
import Profile from "@/views/Profile-praticien"

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/praticien",
        name: "praticien",
        component: Praticien,
    },
    {
        path: "/praticien/:id",
        name: "Profile",
        component: Profile,
    },
    {
        path: "/about",
        name: "About",
        component: About,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;