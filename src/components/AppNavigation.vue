<template>
    <!-- <v-app-bar 
        elevation="10"
        color="background-dark"
        class="pa-6 d-flex"
    >
        <template v-slot:prepend>
            <v-app-bar-nav-icon 
                icon="mdi-cupcake" 
                color="primary">
            </v-app-bar-nav-icon>
            <v-app-bar-title
                class="text-primary font-weight-bold"
            >Десертный уголок</v-app-bar-title>
        </template> -->
        <!-- <div class="">
            <v-btn color="primary" variant="outlined" class="mr-10">
                Войти
            </v-btn>
            <v-btn 
                @click="router.push('/admin')" 
                color="primary" 
                variant="tonal"
            >
                Администратор
            </v-btn>
        </div> -->
    <!-- </v-app-bar> -->
     <v-sheet
        class="bg-background-dark pa-6 elevation-10"
     >
     <div class="mw-1000px d-flex justify-space-between">
        <h2 class="text-center text-primary">
            <v-icon class="mr-3">mdi-cupcake</v-icon>
            Десертный уголок
        </h2>
        <v-btn 
            @click="logout"
            inline-block 
            variant="tonal"
            color="primary"
            >
            Выйти
        </v-btn>
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

<style>
.mw-1000px {
    max-width: 1000px;
    margin: 0 auto;
}
</style>