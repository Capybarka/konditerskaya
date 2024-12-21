<template>
    <v-app app>
        <AppNavigation/>

        <v-main>
            <v-container>
                <router-view/>
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup>
import AppNavigation from './components/AppNavigation.vue';
</script>

<style>

</style>