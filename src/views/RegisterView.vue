<template>
    <div class="w-full max-w-xs mx-auto">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="fullname">
            Fullname
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fullname" type="text" placeholder="Fullname" v-model="data_form.name">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email" v-model="data_form.email">
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" v-model="data_form.password">
        </div>
        <div class="flex items-center justify-between">
          <a @click="func_register" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer">
            Register
          </a>
        </div>
      </form>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import eventBus from '../shared/eventBus';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore()
const { register } = authStore

const data_form = reactive({
    name: '',
    email: '',
    password: '',
})

const func_register = () => {
  register(data_form)
    .then(response => {
      eventBus.emit("alert-notification", {
          message: response?.data.message,
          alertType: "success",
          timeout: 3000,
          show: true,
      });
    })
    .catch(err => {
      eventBus.emit("alert-notification", {
            message: err.response?.data.message,
            alertType: "error",
            timeout: 5000,
            show: true,
        });
    })
}
</script>
  