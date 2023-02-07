<script setup>
import { ref, toRef } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";

const stockInfo = defineProps(['test']);

// const data = ref(stockInfo.test)

// onMounted(() => {
//     data.value = stockInfo.test
// })

// console.log(stockInfo);
</script>

<template>
    <p>id: {{ stockInfo.test.price }}</p>
</template>
