import { createWebHistory, createRouter } from "vue-router";
//import Layout from "@/views/Layout.vue"
import About from "@/views/About.vue";
import Home from "@/views/Home.vue";
import Login from "@/views/Login"
import Praticien from "@/views/Praticien"
import Profile from "@/views/Profile-praticien"
import store from "../store"

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
        // beforeEnter: (to, from, next) => {
        //     if (store.getters.getUserName === null){
        //         next('/login')
        //     }else{
        //         next()
        //     }
        // }
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
        beforeEnter: (to, from, next) => {
            if (store.state.user.login === null) {
                next('/login')
            }else{
                next() 
            }
        }
    },
    {
        path: "/praticien/:id",
        name: "Profile",
        component: Profile,
        beforeEnter: (to, from, next) => {
            if(store.state.user.login === null){
                next('/login')
            }else{
                next()
            }
        }
    },
    {
        path: "/about",
        name: "About",
        component: About,
        beforeEnter: (to, from , next) => {
            if (store.state.user === null){
                next('/login')
            }else{
                next()
            }
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;