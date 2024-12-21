<template>
 <v-sheet class="bg-background-light pa-5 mb-10">
    <div class="d-flex">
      <div class="mr-10">
        <v-img
          class="rounded-lg"
          :width="300"
          :height="300"
          object-fit="cover"
          aspect-ratio="1"
          cover
          :src="product.image_url"
        ></v-img>
      </div>
      <div class="">
        <p class="mb-3"><span class="text-primary font-weight-bold">Название: </span>{{ product.name }}</p>
        <p class="mb-3"><span class="text-primary font-weight-bold">Описание: </span>{{ product.description }}</p>
        <p class="mb-3"><span class="text-primary font-weight-bold">Цена: </span>{{ product.price }} руб</p>
        <p class="mb-3"><span class="text-primary font-weight-bold">Категория: </span>{{ product.category_id }}</p>
        <p class="mb-3"><span class="text-primary font-weight-bold">Вес: </span>{{ product.weight }} грамм</p>
      </div>
    </div>
  </v-sheet>
</template>

<script setup>
import axios from 'axios';
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

let product = reactive({})

const loadProduct = async () => {
  const productId = Number(route.params.id);
  try {
    const response = await axios.get(`http://localhost:8080/api/products/${productId}`);
    if (response.status === 200) {
      product = response.data;
      // console.log(product);
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error('Товар не найден');
    } else {
      console.error('Ошибка при загрузке данных о товаре:', error);
    }
  }
};

onMounted(loadProduct);

</script>