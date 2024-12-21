import { createMemoryHistory, createRouter } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import AdminPanel from '../pages/AdminPanel.vue'
import AddItem from '../pages/AddItem.vue'
import ItemPage from '../pages/ItemPage.vue'
import AdminLogin from '../components/AdminLogin.vue'
import RegisterAdmin from '../pages/RegisterAdmin.vue'
import AdminsPage from '../pages/AdminsPage.vue'

const routes = [
    {
        path: '/',
        component: HomePage
    },
    {
        path: '/admin',
        component: AdminPanel
    },
    {
        path: '/add',
        component: AddItem
    },
    {
        path: '/product/:id',
        component: ItemPage
    },
    {
        path: '/adminLogin',
        component: AdminLogin
    },
    {
        path: '/registerAdmin',
        component: RegisterAdmin
    },
    {
        path: '/adminsPage',
        component: AdminsPage
    },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes
})

export default router