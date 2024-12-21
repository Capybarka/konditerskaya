<template>
  <v-app-bar 
      elevation="10"
      color="background-dark"
      class="pa-6 d-flex"
  >
      <template v-slot:prepend>
          <v-app-bar-nav-icon icon="mdi-cookie" color="primary"></v-app-bar-nav-icon>
      </template>
      <v-spacer></v-spacer>
      <div class="">
          <v-btn color="primary" variant="outlined" class="mr-10">
              На главную
          </v-btn>
          <v-btn @click="router.push('')" color="primary" variant="outlined">
                Управление пользователями
          </v-btn>
      </div>
  </v-app-bar>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()
</script>