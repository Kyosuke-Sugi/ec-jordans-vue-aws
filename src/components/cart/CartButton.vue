<script lang="ts" setup>
import { useCartStore } from '@/stores/cart';
import { storeToRefs } from 'pinia';
import { computed, onMounted } from 'vue';

const data = defineProps(['cart']);

const stock = computed(() => {
    return data?.cart
})

const store = useCartStore();
const { localCart } = storeToRefs(store);


onMounted(() => {
    store.getLocalCart();
})

const addToCart = (stock: any) => {
    const storage = localStorage.getItem("shoppingCart");
    if(storage || storage?.length) {
        const local = JSON.parse(storage)
        local.unshift(stock);
        localStorage.setItem("shoppingCart", JSON.stringify(local));
    } else {
        localStorage.setItem("shoppingCart", JSON.stringify([stock]))
    }
    store.getLocalCart();
}

</script>

<template>
    <div>
        <button 
        v-if="localCart.some((item) => item.id === stock.id)"
        disabled
        class="w-36 h-20 p-2 bg-slate-400 rounded-xl text-black shadow-inner"
        >
        カートに追加済み
        </button>
        <button 
        v-else
        @click="addToCart(stock)"
        class="w-36 h-20 p-2 bg-emerald-400 rounded-xl text-black shadow"
        >
        カートに追加
        </button>
    </div>
</template>
