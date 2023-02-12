<script lang="ts" setup>
import { useCounterStore } from "@/stores/counter";
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { watch } from "vue";
import { storeToRefs } from "pinia";
import type { Ref } from "vue";
import { supabase } from "../supabase";

const store = useCounterStore();
const { stocks, page, limit, allTotal  } = storeToRefs(store);

onMounted(async () => {
    await store.getAllSize();
    await store.getPagingStocks(page.value, limit.value);
});

watch(page, async() => {
    await store.getPagingStocks(page.value, limit.value);
})

</script>

<template>
    <div class="text-center text-lg my-5" v-if="store.series">
        <p>「{{ store.series }}」シリーズの絞り込み結果</p>
        <p class="py-3">全{{ allTotal }}品中<span class="font-bold px-3">{{ store.total }}</span>品</p>
    </div>
    <div class="text-center text-lg my-5" v-if="store.keyword">
        <div v-if="stocks.length">
          <p>「{{ store.keyword }}」の検索結果</p>
          <p class="py-3">全{{ allTotal }}品中<span class="font-bold px-3">{{ store.total }}</span>品</p>
        </div>
        <div v-else>
          <p>「{{ store.keyword }}」に一致する商品はありませんでした</p>
        </div>
    </div>
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
