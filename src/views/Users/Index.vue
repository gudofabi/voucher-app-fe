<template>
    <div class="container mx-auto">
        <div class="p-4">
            <div class="flex justify-between">
                <h1 class="text-2xl font-bold mb-4">User List</h1>
            </div>
            <div class="flex flex-col">
            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-800 text-white">
                        <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">#</th>
                        <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Voucher Name</th>
                        <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="(voucher, index) in paginatedUsers" :key="voucher.id">
                        <td class="px-6 py-4 whitespace-nowrap">{{ voucher.id }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ voucher.name }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex space-x-4">
                            <router-link :to="`/voucher/edit/${voucher.id}`">
                                <i class="ph ph-pen nib-tip text-blue-500 hover:text-blue-700"></i>
                            </router-link>
                            <button @click="deleteVoucher(voucher.id)">
                                <i class="ph ph-x text-red-500 hover:text-red-700"></i>
                            </button>
                            </div>
                        </td>
                        </tr>
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
            </div>
            <div class="flex justify-between mt-4">
            <button @click="prevPage" :disabled="page === 1" class="px-4 py-2 bg-blue-500 text-white rounded">Prev</button>
            <button @click="nextPage" :disabled="page >= totalPages" class="px-4 py-2 bg-blue-500 text-white rounded">Next</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const users = ref([
{ id: 1, name: 'Voucher 1' },
{ id: 2, name: 'Voucher 2' },
{ id: 3, name: 'Voucher 3' },
{ id: 4, name: 'Voucher 1' },
{ id: 5, name: 'Voucher 2' },
{ id: 6, name: 'Voucher 3' },
{ id: 7, name: 'Voucher 1' },
{ id: 8, name: 'Voucher 2' },
{ id: 9, name: 'Voucher 3' },
// ...
]);

const page = ref(1);
const limit = 5;

const totalPages = computed(() => Math.ceil(users.value.length / limit));
const paginatedUsers = computed(() => {
const start = (page.value - 1) * limit;
return users.value.slice(start, start + limit);
});

function nextPage() {
if (page.value < totalPages.value) page.value++;
}

function prevPage() {
if (page.value > 1) page.value--;
}

function deleteVoucher(id) {
users.value = users.value.filter(voucher => voucher.id !== id);
}

</script>

<style>
/* Add your custom styles here */
</style>
  