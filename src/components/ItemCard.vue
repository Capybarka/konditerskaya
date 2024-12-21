<template>
  <v-sheet class="bg-background-light pa-5 mb-10">
    <div class=" d-flex ">
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
        <p class="mb-3"><span class="text-primary font-weight-bold">Название: </span>{{product.name}}</p>
        <p class="mb-3"><span class="text-primary font-weight-bold">Описание: </span>: {{ product.description }}</p>
        <p class="mb-3"><span class="text-primary font-weight-bold">Цена: </span>: {{ product.price }} руб</p>
        <p class="mb-3"><span class="text-primary font-weight-bold">Категория: </span> {{ product.category_id }}</p>
        <p class="mb-3"><span class="text-primary font-weight-bold">Вес: </span> {{ product.weight }} грамм</p>
        <p class="mb-3"><span class="text-primary font-weight-bold">В наличии: </span> {{ product.quantity }} шт</p>

        <v-btn 
          @click="showDetail"
          variant="tonal"
          class="mt-10 bg-primary"
        >
          Просмотр
        </v-btn>
      </div>
    </div>
  </v-sheet>
</template>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const router = useRouter()

const showDetail = () => {
console.log(props.product.id)
  router.push(`/product/${props.product.id}`)
}
</script>

<style scoped>
.v-sheet {
  max-width: 1000px;
  margin: 0 auto;
}
</style>