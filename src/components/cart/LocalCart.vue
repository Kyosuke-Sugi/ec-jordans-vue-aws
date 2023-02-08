<script lang="ts" setup>
import LocalStock from "./LocalStock.vue";
import TotalPrice from "./TotalPrice.vue";
</script>

<template>
    <h1 class="w-3/4 mx-auto my-16 text-3xl font-bold text-slate-700">ショッピングカート</h1>
    <div class="flex justify-between w-3/4 mx-auto mb-8">
        <LocalStock />
        <TotalPrice />
    </div>
</template>
