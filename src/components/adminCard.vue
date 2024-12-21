<template>
  <v-sheet class="bg-background-dark my-10 pa-5 rounded-lg elevation-10">
    <p class="mb-3"><span class="text-primary font-weight-bold">id: </span>{{ admin.id }}</p>
    <p class="mb-3"><span class="text-primary font-weight-bold">Фамилия: </span>{{ admin.name }}</p>
    <p class="mb-3"><span class="text-primary font-weight-bold">Имя: </span>{{ admin.last_name }}</p>
    <p class="mb-3"><span class="text-primary font-weight-bold">Отчество: </span>{{ admin.middle_name }}</p>
    <p class="mb-3"><span class="text-primary font-weight-bold">Эл. почта: </span>{{ admin.email }}</p>
    <p class="mb-3"><span class="text-primary font-weight-bold">Дата регистрации: </span>{{ formattedDate }}</p>

    <v-btn
      @click="deleteAdmin(admin.id)"
      color="error"
    >
      Удалить администратора
    </v-btn>
  </v-sheet>
</template>

<script setup>
import axios from 'axios'
import { useRouter } from 'vue-router';

const router = useRouter()
const props = defineProps({
  admin: {
    type: Object,
    required: true
  }
})

const isoDate = props.admin.created_at
const date = new Date(isoDate)

const formattedDate = date.toLocaleString("ru-RU", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  timeZone: "UTC",
});

const deleteAdmin = async (id) => {
  const isConfirmed = window.confirm('Вы уверены, что хотите удалить этого администратора?')
  if (isConfirmed) {
    try {
      const response = await axios.delete('http://localhost:8080/api/admins', {
        data: { id }, 
    })
    alert(response.data.message)
    router.push('/admin')
    } 
    catch (error) {
      console.error('Ошибка при удалении администратора:');
    }
  }
}
</script>