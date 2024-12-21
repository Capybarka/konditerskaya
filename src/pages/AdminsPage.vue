<template>
  <adminCard 
    v-for="admin in admins"
    :key="admin.id"
    :admin="admin"
  >
  </adminCard>
</template>

<script setup>
import adminCard from '../components/adminCard.vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const admins = ref([])
const router = useRouter()

// Функция для получения данных
const fetchAdmins = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/admins');
    console.log(response.data)
    admins.value = response.data; // Обновляем массив 
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
  } 
}

// Получаем данные при монтировании компонента
onMounted(fetchAdmins);

</script>

