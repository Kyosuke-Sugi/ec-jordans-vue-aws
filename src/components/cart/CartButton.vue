<script lang="ts" setup>
import { useCartStore } from '@/stores/cart';
import type { Stock } from '@/types/types';
import { useCookie } from '@/useCookie';
import { storeToRefs } from 'pinia';
import { ref, computed, onMounted, type Ref, type ComputedRef } from 'vue';

const data = defineProps(['cart']);

const stock: ComputedRef<Stock> = computed(() => {
    return data?.cart
})

const userID: Ref<string | undefined> = ref("");

const store = useCartStore();
const { localCart, memberCart } = storeToRefs(store);


onMounted(() => {
    userID.value = useCookie();
    store.getLocalCart();
    if(userID.value) {
        store.getMemberCart(userID.value);
    }
})

const addToLocalCart = (stock: Stock) => {
    store.addLocalCart(stock);
    store.getLocalCart();
}

const addToMemberCart = async (stock: Stock) => {
    if(userID.value) {
        await store.addMemberCart(parseInt(userID.value), stock.id);
        store.getMemberCart(userID.value);
    }
}

</script>

<template>
    <div v-if="userID">
        <button 
        v-if="memberCart.some((cart) => cart.stocks.id === stock.id)"
        disabled
        class="w-36 h-20 p-2 bg-slate-400 rounded-xl text-black shadow-inner"
        >
        カートに追加済み
        </button>
        <button 
        v-else
        @click="addToMemberCart(stock)"
        class="w-36 h-20 p-2 bg-emerald-400 rounded-xl text-black shadow"
        >
        カートに追加
        </button>
    </div>
    <div v-else>
        <button 
        v-if="localCart.some((item) => item.id === stock.id)"
        disabled
        class="w-36 h-20 p-2 bg-slate-400 rounded-xl text-black shadow-inner"
        >
        カートに追加済み
        </button>
        <button 
        v-else
        @click="addToLocalCart(stock)"
        class="w-36 h-20 p-2 bg-emerald-400 rounded-xl text-black shadow"
        >
        カートに追加
        </button>
    </div>
</template>
