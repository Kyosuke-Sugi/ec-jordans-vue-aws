<script lang="ts" setup>
import { useCounterStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';

const store = useCounterStore();

const { page, limit, allTotal, keyword, series } = storeToRefs(store);

const range = (start: number, end: number) => {
        return [...Array(end - start + 1)].map((_, i) => start + i);
}

const reset: () => void = () => {
    window.scrollTo(0, 0);
    location.reload();
}

const jump = (num: number) => {
    store.jumpPage(num); 
}

</script>

<template>
    <div v-if="keyword === '' && series === ''" class="font-semibold text-lg flex justify-center gap-8 w-52 mx-auto my-14">
        <button 
          @click="store.prevPage" 
          :disabled="page === 1"
          class="disabled:opacity-50 px-5 py-3 rounded-xl hover:bg-[#9373b0] hover:text-white"
        >
        Prev
        </button>
        <ul class="flex justify-center">
          <li class=" mx-4" v-for="num in range(1, Math.ceil(allTotal / limit))" :key="num">
            <button v-if="page === num" class="px-5 py-3 rounded-xl bg-[#35325c] text-white" @click="jump(num)" :disabled="num === page">{{ num }}</button>
            <button v-else class="px-5 py-3 rounded-xl hover:bg-[#9373b0] hover:text-white" @click="jump(num)" :disabled="num === page">{{ num }}</button>
          </li>
        </ul>
        <button 
          @click="store.nextPage" 
          :disabled="page === Math.ceil(allTotal / limit)"
          class="disabled:opacity-50 px-5 py-3 rounded-xl hover:bg-[#9373b0] hover:text-white"
        >
        Next
        </button>
    </div>
    <div v-else class="text-center my-10">
        <button @click="reset">全商品一覧に戻る</button>
    </div>
</template>
