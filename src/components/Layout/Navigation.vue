<template>
  <nav class="bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
      <div class="flex justify-between items-center">
        <div>
          <router-link to="/" class="text-white text-xl font-bold sm:text-2xl">Voucher App</router-link>
        </div>
        <div class="hidden md:flex items-center space-x-6">
          <router-link to="/voucher" class="text-white">Voucher</router-link>
          <router-link to="/group" class="text-white">Group</router-link>
          <router-link to="/users" class="text-white">Users</router-link>
          <div class="flex space-x-4 items-center">
            <div class="text-white text-lg sm:text-xl">
              Logged in as {{authStore.getUser?.name}}
            </div>
            <a class="text-white cursor-pointer" @click="logout">Logout</a>
          </div>
        </div>
        <div class="md:hidden">
          <button @click="isOpen = !isOpen" class="text-white">
            <svg fill="currentColor" viewBox="0 0 20 20" :class="{'hidden': isOpen, 'block': !isOpen}" class="h-6 w-6">
              <path fill-rule="evenodd" d="M0 3a1 1 0 011-1h18a1 1 0 110 2H1a1 1 0 01-1-1zm0 7a1 1 0 011-1h18a1 1 0 110 2H1a1 1 0 01-1-1zm0 7a1 1 0 011-1h18a1 1 0 110 2H1a1 1 0 01-1-1z" clip-rule="evenodd" />
            </svg>
            <svg fill="currentColor" viewBox="0 0 20 20" :class="{'block': isOpen, 'hidden': !isOpen}" class="h-6 w-6">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore()
const { logout } = authStore

const isOpen = ref(false);

</script>
