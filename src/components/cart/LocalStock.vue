<script lang="ts" setup>
import { onMounted } from 'vue';
import { useCartStore } from '@/stores/cart';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const store = useCartStore();
const { localCart } = storeToRefs(store);


onMounted(() => {
    store.getLocalCart();
})

const deleteItem = (localCart: any, id: number) => {
    const deleted = localCart.filter((item: any) => item.id !== id)
    localStorage.setItem("shoppingCart", JSON.stringify(deleted))
    store.getLocalCart();
}

</script>

<template>
    <ul v-if="localCart.length" class="w-1/2 mx-auto">
      <li v-for="stock in localCart" class=" mb-4 py-5 border-b-2 " :key="stock.id">
        <div class="flex justify-left items-center">
            <div class=" w-52">
              <img :src="'/' + stock.image1" :alt="stock.items?.name" class="w-full h-full">
            </div>
            <ul class=" mx-16">
              <li class="text-xl mb-5">{{ stock.items?.name }}</li>
              <li class="text-xl mb-5">
                ¥ {{ stock.price.toLocaleString() }}（税込）
              </li>
              <li class="mb-5">
                <label htmlFor="count">
                  個数
                </label>
                <select id="count">
                  <option value="1">1</option>
                </select>
                <button @click="deleteItem(localCart, stock.id)">削除ボタン</button>
              </li>
            </ul>
        </div>
      </li>
    </ul>
    <p v-else>※カートの中に商品はありません</p>
</template>
