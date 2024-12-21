<template>
  <v-sheet class="bg-background-light pa-5 my-10 rounded-lg elevation-10">
    <h2 class="text-primary text-center">Управление позицией</h2>
  </v-sheet>

  <v-sheet class="bg-background-dark pa-5 mb-10 rounded-lg elevation-10">
  <h2 class="text-primary text-center mb-5">{{ product.name }}</h2>
  <v-col justify="center" align="center">
    <v-row>
      <v-img
        :src="product.image_url"
        class="rounded-xl mb-5"
        width="300"
        height="350"  
      >
      </v-img>
    </v-row>
  </v-col>
  
  <v-form
      @submit.prevent
      class="bg-background-dark rounded-lg pa-5 mw-1000">
      <v-text-field 
        variant="outlined"
        :label="`Id позиции: ${Number(route.params.id)}`"
        required
        disabled
      ></v-text-field>

      <p class="text-primary mb-2 pl-2">Название</p>
      <v-text-field 
        variant="outlined"
        class="mb-3"
        v-model="product.name"
        required
      ></v-text-field>

      <p class="text-primary mb-2 pl-2">Описание</p>
      <v-textarea
        variant="outlined"
        clear-icon="mdi-close-circle"
        v-model="product.description"
        class="mb-3"
        clearable
        required
      >
      </v-textarea>

      <p class="text-primary mb-2 pl-2">Категория</p>
      <v-text-field
        variant="outlined"
        class="mb-3"
        v-model="product.category_id"
        required
      ></v-text-field>

      <p class="text-primary mb-2 pl-2">Цена (руб)</p>
      <v-text-field
        variant="outlined"
        v-model="product.price"
        type="number"
        class="mb-3"
        max="10000"
        min="50"
        required
      ></v-text-field>

      <p class="text-primary mb-2 pl-2">Вес (гр)</p>
      <v-text-field
        v-model="product.weight"
        variant="outlined"
        class="mb-3"
        type="number"
        max="10000"
        min="50"
        required
      ></v-text-field>

      <p class="text-primary mb-2 pl-2">В наличии (шт)</p>
      <v-text-field
        v-model="product.quantity"
        variant="outlined"
        class="mb-3"
        type="number"
        max="10000"
        min="50"
        required
      ></v-text-field>

      <v-file-input 
        clearable 
        label="Выберите новое изображение" 
        variant="outlined"
        accept="image/*"
        name="image"
      >
      </v-file-input>

      <v-btn 
        @click="updateProduct"
        color="primary"
        class="mt-2 w-100" 
        type="submit" 
        prepend-icon="mdi-plus-box-multiple"
      >
        Сохранить изменения
      </v-btn>
    </v-form>
  </v-sheet>
</template>

<script setup>
import axios from 'axios';
import { onMounted, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const route = useRoute()
const router = useRouter()

let product = reactive({
  image_url: '',
  name: '',
  description: '',
  price: 0,
  category_id: 0,
  weight: 0,
  quantity: 0,
})

const loadProduct = async () => {
  const productId = Number(route.params.id);
  try {
    const response = await axios.get(`http://localhost:8080/api/products/${productId}`);
    if (response.status === 200) {
      // Обновляем свойства объекта по отдельности, чтобы сохранить реактивность
      product.name = response.data.name;
      product.description = response.data.description;
      product.price = response.data.price;
      product.category_id = response.data.category_id;
      product.weight = response.data.weight;
      product.quantity = response.data.quantity;
      product.image_url = response.data.image_url;
      console.log(product)
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error('Товар не найден');
    } else {
      console.error('Ошибка при загрузке данных о товаре:', error);
    }
  }
};

const updateProduct = async () => {
  const productId = Number(route.params.id);
  const formData = new FormData();
  formData.append('name', product.name);
  formData.append('description', product.description);
  formData.append('category_id', product.category_id);
  formData.append('price', product.price);
  formData.append('weight', product.weight);
  formData.append('quantity', product.quantity);

  // Если изображение выбрано, добавляем его в formData
  const fileInput = document.querySelector('input[type="file"]');
  if (fileInput && fileInput.files.length > 0) {
    formData.append('image', fileInput.files[0]);
  } else {
    formData.append('image_url', product.image_url); // если изображение не меняется
  }

  try {
    const response = await axios.put(`http://localhost:8080/api/products/${productId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.status === 200) {
      console.log('Товар успешно обновлен')
      router.push('/admin')

    }
  } catch (error) {
    console.error('Ошибка при обновлении товара:', error);
  }
};

onMounted(loadProduct);

</script>

<style>
.mw-1000 {
  max-width: 1000px;
  margin: 0 auto;
}
</style>