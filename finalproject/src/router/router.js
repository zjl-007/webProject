import VueRouter from 'vue-router'
import Home from "../views/home/home.vue"
import Login from "../views/login/login"
import mainRouter from './childRouter/mainRouter'
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: mainRouter,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
]

const router = new VueRouter({
    routes,
    mode: 'history',
});

router.beforeEach((to, from, next) => {
    let token = window.sessionStorage.getItem('token');
    if (to.path !== '/login' && !token) {
        // this.$router.push('/login');
        next('/login')
        return;
    }
    next()
})
export default router;