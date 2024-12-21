<template>
  <v-sheet class="my-10 bg-background-dark elevation-10 rounded-lg pa-5">
    <h2 class="text-primary text-center mb-10">Управление товарами</h2>
    <v-text-field label="Название товара"></v-text-field>
    <v-col>
      <v-row justify="center" align="center">
        <v-btn>Найти</v-btn>
      </v-row>
    </v-col>
  </v-sheet>

  <item-card 
    v-for="product in products" 
    :key="product.id"
    :product="product"
    class="rounded-lg"
  ></item-card>
</template>

<script setup>
import ItemCard from '../components/ItemCard.vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';

const products = ref([])


// Функция для получения данных
const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/products');
    console.log(response.data)
    products.value = response.data; // Обновляем массив товаров
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
  } 
}

// Получаем данные при монтировании компонента
onMounted(fetchProducts);
</script>