<template>
  <v-card class="bg-background-light">
    <v-img  
      :width="300"  
      aspect-ratio="16/9"
      cover
    
    >
    <v-card-title>Название {{product.name}}</v-card-title>
    <v-card-text>Описание {{ product.description }}</v-card-text>
    <p>Цена {{ product.price }}</p>
    <p>Категория {{ product.category_id }}</p>
    <p>Вес {{ product.weight }}</p>

    </v-img>
  </v-card>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>