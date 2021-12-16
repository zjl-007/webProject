import VueRouter from 'vue-router'
import Home from "../components/Home.vue"
import Login from "../views/login/login"
const routes  = [
    {
        path: '',
        redirect: '/login',
    },
    {
        path: '/login',
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
    mode: 'hash',
});

router.beforeEach((to, from, next) => {
    let token = window.sessionStorage.getItem('token');
    if(to.path !== '/login' && !token) {
        this.$router.push('/login');
        return;
    }
    next()
  })
export default router;