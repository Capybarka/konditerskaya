<template>
  <v-sheet class="bg-background-light pa-5 mb-10">
    <div class=" d-flex ">
      <div class="mr-10">
        <v-img
          class="rounded-lg"  
          :width="300"  
          aspect-ratio="16/9"
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
      
        <v-btn 
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
defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>