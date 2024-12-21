<template>
  <v-sheet class="my-10 bg-background-dark elevation-10 rounded-lg pa-5">
    <h2 class="text-primary text-center mb-8">Добавление товара</h2>
    <v-col>
      <v-row justify="center" align="center">
        <v-btn
        @click="router.push('/add')"
          variant="outlined"
          color="primary"
        >
          Добавить новую позицию
        </v-btn>
      </v-row>
    </v-col>
  </v-sheet>

  <v-sheet class="my-10 bg-background-dark elevation-10 rounded-lg pa-5">
    <h2 class="text-primary text-center mb-8">Управление товарами</h2>
    <v-text-field 
      v-model="searchingName"
      label="Название товара">
    </v-text-field>
    <v-row>
      <v-col justify="center" align="center">
        <v-btn
          @click="searchProduct"
          variant="outlined"
          color="primary"
          class="mr-5"
        >
          Найти
        </v-btn>
        
      </v-col>
    
    </v-row>
    <v-row>
      <v-col justify="center" align="center">
        <v-btn
          @click="fetchProducts"
          color="primary"
        >
          Показать все товары
        </v-btn>
      </v-col>
    </v-row>
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const products = ref([])
const router = useRouter()

// Функция для получения данных
const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/products');
    products.value = response.data; // Обновляем массив товаров
  } catch (error) {
    console.error('Ошибка при получении данных:', error)
  } 
}

const searchingName = ref('')
const searchProduct = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/productsOfName', {
      params: { name: searchingName.value },
    })
    products.value = response.data
  } catch (error) {
    console.error('Ошибка при поиске товара:', error)
    alert(error.response?.data?.message || 'Ошибка при поиске товара')
  }
}

const priceFilter = () => {

}

</script>