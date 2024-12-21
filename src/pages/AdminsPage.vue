<template>
  <v-row v-if="!visible">
    <v-col align="center">
      <v-icon color="primary" style="font-size: 100px; display: block;" class="mb-10">mdi-security</v-icon>
      <v-btn @click="visible=true" color="primary">Запросить администраторов</v-btn>
    </v-col>
  </v-row>
  
  <adminCard 
    v-if="visible"
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

const visible = ref(false)
// Функция для получения данных
const fetchAdmins = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/admins');
    admins.value = response.data; // Обновляем массив 
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
  } 
}
// Получаем данные при монтировании компонента
onMounted(fetchAdmins);
</script>

