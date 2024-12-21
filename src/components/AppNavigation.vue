<template>
    <v-sheet
        class="bg-background-dark pa-6 elevation-10"
    >
        <div class="d-flex justify-space-between">
            <h2 class="text-center text-primary">
                <v-icon class="mr-3">mdi-cupcake</v-icon>
                Десертный уголок
            </h2>
            <div class="">
                <v-btn
                    @click="router.push('/admin')"
                    class="mr-5"
                    color="primary"
                >
                    На главную
                </v-btn>
                <v-btn 
                    @click="router.push('/registerAdmin')"
                    inline-block 
                    variant="tonal"
                    color="primary"
                    class="mr-5"
                >
                    Зарегистрировать администратора
                </v-btn>
                <v-btn 
                    @click="router.push('/adminsPage')"
                    inline-block 
                    variant="tonal"
                    color="primary"
                    class="mr-5"
                >
                    Список администраторов
                </v-btn>
                <v-btn 
                    @click="logout"
                    inline-block 
                    variant="tonal"
                    color="primary"
                >
                    Выйти
                </v-btn>
            </div>
        </div>
    </v-sheet>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

const logout = () => {
    localStorage.setItem('isAdminLogin', false)
    router.push('/adminLogin')
}
</script>
