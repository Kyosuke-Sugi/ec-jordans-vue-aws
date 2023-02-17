<script lang="ts" setup>
import CautionMark from "./CautionMark.vue";
import { useCartStore } from '@/stores/cart';
import { useCookie } from '@/useCookie';
import { storeToRefs } from 'pinia';
import { ref, onMounted, type Ref } from 'vue';

const store = useCartStore();

const { memberCart, localCart, total } = storeToRefs(store);
 
const userID: Ref<string | undefined> = ref("");
onMounted(() => {
    userID.value = useCookie();
    store.getLocalCart();
    store.getMemberCart(userID.value);
})

const deleteItem = async (stockID: number) => {
    if(userID.value) {
      await store.deleteMemberCart(parseInt(userID.value), stockID);
      store.getMemberCart(userID.value);
    }
}

</script>

<template>
    <CautionMark class="w-3/4 mx-auto" v-if="localCart.length" />
    <div class="flex justify-between w-3/4 mx-auto mb-8">
        <ul>
          <li v-for="cart in memberCart" class=" mb-4 py-5 border-b-2 " :key="cart.stocks.id">
            <div class="flex justify-left items-center">
                <div class=" w-52">
                  <img :src="'/' + cart?.stocks.image1" :alt="cart.stocks.items?.name" class="w-full h-full">
                </div>
                <ul class=" mx-16">
                  <li class="text-xl mb-5">{{ cart.stocks.items?.name }}</li>
                  <li class="text-xl mb-5">
                    ¥ {{ cart.stocks.price }}（税込）
                  </li>
                  <li class="mb-5">
                    <label htmlFor="count">
                      個数
                    </label>
                    <select id="count">
                      <option value="1">1</option>
                    </select>
                    <button @click="deleteItem(cart.stocks.id)">削除ボタン</button>
                  </li>
                </ul>
            </div>
          </li>
        </ul>
        <div class="w-1/2 mr-14 sticky top-40">
          <div class="sticky top-40">
            <div class=" w-52 float-right">
              <dl class="flex justify-between p-3 mb-2 float-right">
                <dt>小計(税込):</dt>
                <dd>￥{{ total.toLocaleString() }}</dd>
              </dl>
              <dl v-if="memberCart.length" class="flex justify-between p-3 mb-2 float-right">
                <dt>送料(一律):</dt>
                <dd>￥{{ 500 }}</dd>
              </dl>
            </div>
            <div class="float-right clear-both text-xl font-bold border-b-2 border-[#ccc] p-3 mb-2">
              <p v-if="memberCart?.length">合計：￥{{ (total + 500).toLocaleString() }}（税込）</p>
              <p v-else>合計：￥{{ total.toLocaleString() }}（税込）</p>
            </div>
            <div class="clear-both float-right my-7">
              <RouterLink to="/settlement">
                <button v-if="memberCart.length" class="w-36 h-10 p-2 bg-red-200 rounded-xl text-black shadow">購入画面へ</button>
              </RouterLink>
            </div>
          </div>
        </div>
    </div>
</template>
