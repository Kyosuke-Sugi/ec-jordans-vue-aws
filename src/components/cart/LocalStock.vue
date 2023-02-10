<script lang="ts" setup>
import { onMounted } from 'vue';
import { useCartStore } from '@/stores/cart';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const store = useCartStore();
const { localCart, total } = storeToRefs(store);


onMounted(() => {
    store.getLocalCart();
})

const deleteItem = (localCart: any, id: number) => {
    store.deleteLocalCart(localCart, id);
    store.getLocalCart();
}

</script>

<template>
    <div class="flex justify-between w-3/4 mx-auto mb-8">
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
      <div class="w-1/2 mr-14 sticky top-40">
        <div class="sticky top-40">
          <div class=" w-52 float-right">
            <dl class="flex justify-between p-3 mb-2 float-right">
              <dt>小計(税込):</dt>
              <dd>￥{{ total.toLocaleString() }}</dd>
            </dl>
            <dl v-if="localCart.length" class="flex justify-between p-3 mb-2 float-right">
              <dt>送料(一律):</dt>
              <dd>￥{{ 500 }}</dd>
            </dl>
          </div>
          <div class="float-right clear-both text-xl font-bold border-b-2 border-[#ccc] p-3 mb-2">
            <p v-if="localCart?.length">合計：￥{{ (total + 500).toLocaleString() }}（税込）</p>
            <p v-else>合計：￥{{ total.toLocaleString() }}（税込）</p>
          </div>
          <div v-if="localCart.length" class="clear-both float-right text-center my-7">
            <p class="text-red-700 font-bold mb-6">購入するにはログインしてください</p>
            <RouterLink to="/login">
              <button class="w-36 h-10 p-2 bg-red-200 rounded-xl text-black shadow">ログインする</button>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
</template>
