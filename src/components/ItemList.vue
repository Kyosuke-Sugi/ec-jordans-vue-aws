<script lang="ts" setup>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import type { Ref } from "vue";
import { supabase } from "../supabase";

const stocks: Ref<any> = ref([]);

onMounted(() => {
    getInfo()
})

const getInfo = async() => {
    try {
        let { data, error, status } = await supabase
            .from("stocks")
            .select("*,items(*)");

        if (error && status !== 406) throw error

        if(data) {
            stocks.value = data;
        }
    }catch (error: any) {
        alert(error.message);
    }
} 
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
