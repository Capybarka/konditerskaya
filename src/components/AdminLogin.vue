<template>
  <v-sheet 
    class="bg-background-dark my-10 pa-5 rounded-lg elevation-10 mx-500">
    <h3 class="text-primary text-center mb-6">Авторизация администратора</h3>
    <v-form @submit.prevent>
      <v-text-field
        v-model="email"
        label="Электронная почта"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        label="Пароль"
        required
      ></v-text-field>
      <v-btn 
        @click="login"
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
import { useRouter } from 'vue-router';

console.log(localStorage.getItem('isAdminLogin'))
const email = ref('')
const password = ref('')

const router = useRouter()

const login = async () => {
  try {
    const response = await axios.post('http://localhost:8080/api/login', {
      email: email.value,
      password: String(password.value),
    });

    if (response.data.success) {
      localStorage.setItem('isAdminLogin', true)
      router.push('/admin')
    } else {
      alert('Неверные данные! Проверьте email и пароль.')
    }
  } catch (error) {
    alert('Ошибка авторизации', error)
  }
};

</script>

<style >
.mx-500{
  max-width: 600px;
  margin: 0 auto;
}
</style>