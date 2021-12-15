import VueRouter from 'vue-router'
import Home from "../components/Home.vue"
import Login from "../views/login/login"
const routes  = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
    }
]

const router = new VueRouter({
    routes,
    mode: 'history',
});
export default router;