<template>
  <v-sheet 
    class="bg-background-dark my-10 pa-5 rounded-lg elevation-10 mx-500">
    <h3 class="text-primary text-center mb-6">Добавление нового администратора</h3>
    <v-form @submit.prevent>
      <v-text-field
        v-model="name"
        label="Имя"
        required
      ></v-text-field>

      <v-text-field
        v-model="last_name"
        label="Фамилия"
        required
      ></v-text-field>

      <v-text-field
        v-model="middle_name"
        label="Отчество"
        required
      ></v-text-field>

      <v-text-field
        type="email"
        v-model="email"
        label="Эл. почта"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        label="Пароль"
        required
      ></v-text-field>

      <v-btn 
        @click="registerAdmin"
        class="mt-2 bg-primary w-100" 
        type="submit"
      >
        Зарегистрировать
      </v-btn>

    </v-form>
  </v-sheet>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const name = ref('');
const last_name = ref('');
const middle_name = ref('');
const email = ref('');
const password = ref('');

const router = useRouter()

// Функция для отправки данных на сервер
const registerAdmin = async () => {
  try {
    const response = await axios.post('http://localhost:8080/api/register', {
      name: name.value,
      last_name: last_name.value,
      middle_name: middle_name.value,
      email: email.value,
      password: password.value,
    })
    alert('Администратор зарегистрирован')
    console.log('Администратор зарегистрирован:', response.data)
    router.push('/admin')
  }
  catch (error) {
    console.error('Ошибка регистрации:', error);
  }
}
</script>