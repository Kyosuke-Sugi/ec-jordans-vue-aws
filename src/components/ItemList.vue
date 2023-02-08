<script lang="ts" setup>
import { useCounterStore } from "@/stores/counter";
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { storeToRefs } from "pinia";
import type { Ref } from "vue";
import { supabase } from "../supabase";

const store = useCounterStore();
const { stocks } = storeToRefs(store);

onMounted(() => {
    store.getAllStocks();
})

</script>

<template>
    <ul class="grid grid-cols-5 w-full">
        <li v-for="stock in stocks" :key="stock.id" class="text-center align-middle w-full">
            <RouterLink :to="{name: 'stock', params: {id: parseInt(stock.id)}}">
                <div class="w-44 h-44 mx-auto">
                    <img :src="stock.image1" :alt="stock.items.name" class="w-full h-full">
                </div>
                <div class="w-full">
                    <p>{{ stock.items.name }}</p>
                    <p>￥{{ stock.price }}</p>
                </div>
            </RouterLink>
        </li>
    </ul>
</template>
