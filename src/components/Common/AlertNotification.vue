<template>
    <transition name="slide-fade">
      <div
        v-show="data_show"
        class="fixed bottom-0 right-0 mb-4 mr-4 p-2 bg-blue-500 text-white rounded shadow-lg"
        :class="{'bg-green-500': data_alertType === 'success', 'bg-red-500': data_alertType === 'error'}"
        @click="data_show = false"
        >
    <div class="flex items-center">
        <i v-if="data_alertType == 'success'" class="ph ph-check-circle mr-2"></i>
        <i v-if="data_alertType == 'error'" class="ph ph-x-circle mr-2"></i>
        {{ data_message }}
    </div>
    </div>
</transition>
</template>

<script setup>
import { ref, onMounted } from "vue";
import eventBus from "../../shared/eventBus";

const data_message = ref("");
const data_alertType = ref("success");
const data_show = ref(false);

onMounted(() => {
    eventBus.on("alert-notification", (e) => {
        data_message.value = e.message;
        data_alertType.value = e.alertType;
        data_show.value = e.show;
        setTimeout(() => {
        data_show.value = false;
        }, e.timeout || 3000);
    });
});
</script>

<style>
.slide-fade-enter-active {
transition: all .3s ease;
}
.slide-fade-leave-active {
transition: all .3s ease;
}
.slide-fade-enter, .slide-fade-leave-to {
transform: translateX(100%);
opacity: 0;
}
</style>
  