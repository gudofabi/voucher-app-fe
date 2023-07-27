<script setup>
import Navigation from './components/Layout/Navigation.vue';
import AlertNotification from './components/Common/AlertNotification.vue';
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <Navigation/>
  <div class="relative pt-5">
    <RouterView />
  </div>
  <AlertNotification/>
</template>

<style scoped></style>
