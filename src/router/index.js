import { createMemoryHistory, createRouter } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import AdminPanel from '../pages/AdminPanel.vue'
import AddItem from '../pages/AddItem.vue'
import ItemPage from '../pages/ItemPage.vue'
import AdminLogin from '../components/AdminLogin.vue'

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
]

const router = createRouter({
    history: createMemoryHistory(),
    routes
})

export default router