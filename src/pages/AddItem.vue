<template>
  <v-sheet class="bg-background-dark rounded-lg elevation-10 my-10 pa-5">
    <h2 class="text-primary text-center mb-10">Добавление позиции</h2> 
  </v-sheet>  
  <div class="bg-background-light pa-5 rounded-lg mb-10">
    <v-form 
      @submit.prevent="submitForm" 
      class="bg-background-dark rounded-lg pa-5">
      <v-text-field
        v-model="name"
        label="Введите название"
        required
      ></v-text-field>

      <v-textarea
        v-model="description"
        clear-icon="mdi-close-circle"
        label="Введите описание"
        clearable
        required
      >
      </v-textarea>

      <v-combobox
        v-model="category"
        label="Категория"
        :items="['Торты', 'Капкейки', 'Пирожные']"
        required
      ></v-combobox>

      <v-text-field
        type="number"
        v-model="price"
        max="10000"
        min="50"
        label="Цена"
        required
      ></v-text-field>

      <v-text-field
        type="number"
        v-model="weight"
        label="Вес (гр)"
        max="10000"
        min="50"
        required
      ></v-text-field>

      <v-text-field
        type="number"
        v-model="quantity"
        label="Количество (шт)"
        max="1000"
        min="1"
        required
      ></v-text-field>

      <v-file-input 
        clearable 
        label="Выберите изображение" 
        variant="outlined"
        v-model="image_url"
        required
        accept="image/*"
        name="image"
      >
      </v-file-input>

      <v-btn 
        color="primary"
        class="mt-2 w-100" 
        type="submit" 
        prepend-icon="mdi-plus-box-multiple"
      >
        Добавить
      </v-btn>

    </v-form>
  </div>
    
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const name = ref('')
const description = ref('')
const category = ref('')
let category_id = 0;

const price = ref()
const weight = ref()
const quantity = ref()
const image_url = ref('')

const submitForm = async () => {
  switch(category.value) {
    case 'Торты ':
      category_id = 1
      break
    case 'Пирожные':
      category_id = 2
      break
    case 'Капкейки':
      category_id = 3
      break
  }

  const formData = new FormData();
  formData.append('name', name.value);
  formData.append('description', description.value);
  formData.append('category_id', category_id);
  formData.append('price', price.value);
  formData.append('weight', weight.value);
  formData.append('quantity', quantity.value);
  formData.append('image', image_url.value);

  try {
    const response = await axios.post('http://localhost:8080/api/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
    alert(response.data.message);
  }
  catch (error) {
    alert('Ошибка при добавлении товара', error);
  }
}
</script>

<style scoped>
.v-form {
  max-width: 1000px;
  margin: 0 auto;
}
</style>