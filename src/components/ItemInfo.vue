<script setup>
import { ref, toRef } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";

const stockInfo = defineProps(['test']);

const data = ref(stockInfo.test)

onMounted(() => {
    data.value = stockInfo.test
})

console.log(data.value);
</script>

<template>
    <p>id: {{ data.price }}</p>
</template>
