<template>
  <v-sheet 
    class="bg-background-dark my-10 pa-5 rounded-lg elevation-10 mx-500"
  >
    <h3 class="text-primary text-center mb-6">Авторизация администратора</h3>
    <v-form>
      <v-text-field
        v-model="email"
        label="Электронная почта"
        required
      ></v-text-field>

      <v-text-field
        type="password"
        v-model="password"
        label="Пароль"
        required
      ></v-text-field>
      <v-btn 
        class="mt-2 bg-primary w-100" 
        type="submit"
      >
        Войти
      </v-btn>
    </v-form>
  </v-sheet>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const email = ref('')
const password = ref('')

const login = async() => {
  try {
    const response = await axios.post('http://localhost:3000/api/login', {
      email: email.value,
      password: password.value
    })

  }
}
</script>

<style scoped>
.mx-500{
  max-width: 600px;
  margin: 0 auto;
}
</style>