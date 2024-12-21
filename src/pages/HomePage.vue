<template>
    <admin-login v-if="!isAdminLogin"></admin-login>
    
    <admin-panel v-if="isAdminLogin"></admin-panel>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import AdminLogin from '../components/AdminLogin.vue';
import AdminPanel from './AdminPanel.vue';

const isAdminLogin = ref(localStorage.getItem('isAdminLogin'))

watchEffect(() => {
  isAdminLogin.value = localStorage.getItem('isAdminLogin') === 'true';
});
</script>
