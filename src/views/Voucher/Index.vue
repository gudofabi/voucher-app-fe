<template>
    <div class="container mx-auto">
        <div class="p-4">
            <div class="flex justify-between items-center mb-2">
                <h1 class="text-2xl font-bold mb-4">My Voucher</h1>
                <button @click="func_generateVoucher" class="px-5 py-2 bg-blue-500 text-white rounded text-md flex items-center">
                    <i class="ph ph-ticket mr-2 text-lg"></i>Generate Voucher
                </button>
            </div>
            <div class="flex flex-col">
            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-800 text-white">
                        <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">#</th>
                        <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Voucher Code</th>
                        <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody v-if=" voucherStore.getVouchers.length == 0" >
                        <tr>
                            <td colspan="3" class="text-center font-medium py-6 text-lg w-full text-gray-500">No voucher available</td>
                        </tr>
                    </tbody>
                    <tbody v-else class="bg-white divide-y divide-gray-200">
                        <tr v-for="(voucher, index) in voucherStore.getVouchers" :key="index">
                        <td class="px-6 py-4 whitespace-nowrap">{{ func_rowNumber(index) }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ voucher.code }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex space-x-4">
                            <button @click="func_updateVoucher(voucher.id)" title="Update Code">
                                <i class="ph ph-arrows-clockwise text-blue-500 hover:text-blue-700"></i>
                            </button>
                            <button @click="func_deleteVoucher(voucher.id)" title="Delete Code">
                                <i class="ph ph-trash text-red-500 hover:text-red-700"></i>
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
            <button class="px-4 py-2 bg-blue-500 text-white rounded">Prev</button>
            <button class="px-4 py-2 bg-blue-500 text-white rounded">Next</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import eventBus from '../../shared/eventBus';
import { useVoucherStore } from '../../stores/voucher';

const voucherStore = useVoucherStore()
const { getVoucherByUserId, createVoucher, updateVoucher, deleteVoucher } = voucherStore

const data_filters = reactive({
    per_page: 5,
    current_page: 1
})

onMounted(() => {
    func_filterTable()
})

const func_rowNumber = (index) => {
    return (voucherStore.currentPage - 1) * voucherStore.meta.per_page + index + 1
}

const func_filterTable = () => {

    getVoucherByUserId(data_filters, JSON.parse(sessionStorage.user)?.id)

}

const func_deleteVoucher = (id) => {
    deleteVoucher(id)
        .then(response => {
            eventBus.emit("alert-notification", {
                message: response?.data.message,
                alertType: "success",
                timeout: 3000,
                show: true,
            });
            func_filterTable()
        })
        .catch(err => {
            eventBus.emit("alert-notification", {
                message: err.response?.data.message,
                alertType: "error",
                timeout: 3000,
                show: true,
            });
        })
}

const func_generateVoucher = () => {
    createVoucher()
        .then(response => {
            eventBus.emit("alert-notification", {
                message: response?.data.message,
                alertType: "success",
                timeout: 3000,
                show: true,
            });
            func_filterTable()
        })
        .catch(err => {
            eventBus.emit("alert-notification", {
                message: err.response?.data.message,
                alertType: "error",
                timeout: 3000,
                show: true,
            });
        })
}

const func_updateVoucher = (voucher_id) => {
    updateVoucher(voucher_id)
        .then(response => {
            eventBus.emit("alert-notification", {
                message: response?.data.message,
                alertType: "success",
                timeout: 3000,
                show: true,
            });
            func_filterTable()
        })
        .catch(err => {
            eventBus.emit("alert-notification", {
                message: err.response?.data.message,
                alertType: "error",
                timeout: 3000,
                show: true,
            });
        })
}


</script>

<style>
/* Add your custom styles here */
</style>
  