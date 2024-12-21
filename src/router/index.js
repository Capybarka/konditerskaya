import { createMemoryHistory, createRouter } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import AdminPanel from '../pages/AdminPanel.vue'

const routes = [
    {
        path: '/',
        component: HomePage
    },
    {
        path: '/admin',
        component: AdminPanel
    },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes
})

export default router