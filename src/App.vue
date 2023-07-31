<script setup>
import Navigation from './components/Layout/Navigation.vue';
import AlertNotification from './components/Common/AlertNotification.vue';
import { RouterView } from 'vue-router'

import { useAuthStore } from './stores/auth'
const authStore = useAuthStore()
</script>

<template>
  <Navigation v-if="authStore.authenticated"/>
  <div class="relative pt-5">
    <RouterView />
  </div>
  <AlertNotification/>
</template>

<style scoped>
</style>
