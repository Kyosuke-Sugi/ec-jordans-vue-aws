<script lang="ts" setup>
import { ref } from 'vue';
import { useCounterStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';

const store = useCounterStore();
const { page, limit } = storeToRefs(store);

const data = ref({
    notifyFrequency: ""
});

const handleFrequency = (e: any) => {
    if(e.target.value === data.value.notifyFrequency){
        data.value.notifyFrequency = "";
    }else {
        data.value.notifyFrequency = e.target.value;
    }

    if(e.target.checked) {
        store.getSeriesResult(e.target.value);
    } else {
        store.getPagingStocks(page.value, limit.value);
    }
}
</script>

<template>
    <div class="bg-[#fbf1e9] h-full sticky -top-52 w-1/5">
        <div class="bg-[#35325c] m-2">
            <p class="text-[#fdffc9] text-center py-5">※当店はすべて税込み表記です</p>
            <div class="w-full py-5 border-b-2 border-[#fbf1e9] border-dashed">
                <img src="/shoplogo.png" alt="JORDANS" class="w-52 mx-auto">
            </div>
            <div>
                <h3 class="text-[#e6da9e] font-['Georgia'] text-2xl text-center py-5">SERIES</h3>
                <div class="w-full text-center">
                    <input
                    type="checkbox"
                    id="posite"
                    name="interest"
                    value="POSITE SERIES"
                    class="peer hidden w-full"
                    :checked="data.notifyFrequency === 'POSITE SERIES'"
                    @change="handleFrequency"
                    />
                    <label htmlFor="posite" class="block text-lg text-[#fbf1e9] w-full p-4 cursor-pointer peer-checked:bg-[#9373b0] peer-checked:text-[#d3d1ed]">POSITE SERIES</label>
                </div>
                <div class="w-full text-center">
                    <input
                    type="checkbox"
                    id="force"
                    name="interest"
                    value="AIR FORCE 1 LOW"
                    class="peer hidden w-full"
                    :checked="data.notifyFrequency === 'AIR FORCE 1 LOW'"
                    @change="handleFrequency"
                    />
                    <label htmlFor="force" class="block text-lg text-[#fbf1e9] w-full p-4 cursor-pointer peer-checked:bg-[#9373b0] peer-checked:text-[#d3d1ed]">AIR FORCE 1 LOW</label>
                </div>
                <div class="w-full text-center">
                    <input
                    type="checkbox"
                    id="JORDAN1"
                    name="JORDAN1"
                    value="JORDAN BRAND 1"
                    class="peer hidden w-full"
                    :checked="data.notifyFrequency === 'JORDAN BRAND 1'"
                    @change="handleFrequency"
                    />
                    <label htmlFor="JORDAN1" class="block text-lg text-[#fbf1e9] w-full p-4 cursor-pointer peer-checked:bg-[#9373b0] peer-checked:text-[#d3d1ed]">JORDAN BRAND 1</label>
                </div>
                <div class="w-full text-center">
                    <input
                    type="checkbox"
                    id="JORDAN5"
                    name="JORDAN5"
                    value="JORDAN BRAND 5"
                    class="peer hidden w-full"
                    :checked="data.notifyFrequency === 'JORDAN BRAND 5'"
                    @change="handleFrequency"
                    />
                    <label htmlFor="JORDAN5" class="block text-lg text-[#fbf1e9] w-full p-4 cursor-pointer peer-checked:bg-[#9373b0] peer-checked:text-[#d3d1ed]">JORDAN BRAND 5</label>
                </div>
                <div class="w-full text-center">
                    <input
                    type="checkbox"
                    id="JORDAN6"
                    name="JORDAN6"
                    value="JORDAN BRAND 6"
                    class="peer hidden w-full"
                    :checked="data.notifyFrequency === 'JORDAN BRAND 6'"
                    @change="handleFrequency"
                    />
                    <label htmlFor="JORDAN6" class="block text-lg text-[#fbf1e9] w-full p-4 cursor-pointer peer-checked:bg-[#9373b0] peer-checked:text-[#d3d1ed]">JORDAN BRAND 6</label>
                </div>
                <div class="w-full text-center">
                    <input
                    type="checkbox"
                    id="BLAZER"
                    name="BLAZER"
                    value="BLAZER"
                    class="peer hidden w-full"
                    :checked="data.notifyFrequency === 'BLAZER'"
                    @change="handleFrequency"
                    />
                    <label htmlFor="BLAZER" class="block text-lg text-[#fbf1e9] w-full p-4 cursor-pointer peer-checked:bg-[#9373b0] peer-checked:text-[#d3d1ed]">BLAZER</label>
                </div>
                <div class="w-full text-center">
                    <input
                    type="checkbox"
                    id="AIR MAX"
                    name="AIR MAX"
                    value="AIR MAX"
                    class="peer hidden w-full"
                    :checked="data.notifyFrequency === 'AIR MAX'"
                    @change="handleFrequency"
                    />
                    <label htmlFor="AIR MAX" class="block text-lg text-[#fbf1e9] w-full p-4 cursor-pointer peer-checked:bg-[#9373b0] peer-checked:text-[#d3d1ed]">AIR MAX</label>
                </div>
                <div class="w-full text-center">
                    <input
                    type="checkbox"
                    id="DUNK"
                    name="DUNK"
                    value="DUNK"
                    class="peer hidden w-full"
                    :checked="data.notifyFrequency === 'DUNK'"
                    @change="handleFrequency"
                    />
                    <label htmlFor="DUNK" class="block text-lg text-[#fbf1e9] w-full p-4 cursor-pointer peer-checked:bg-[#9373b0] peer-checked:text-[#d3d1ed]">DUNK</label>
                </div>
            </div>
        </div>
    </div>
</template>
