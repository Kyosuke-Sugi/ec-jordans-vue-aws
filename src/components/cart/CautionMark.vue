<script lang="ts" setup>
import { useCartStore } from '@/stores/cart';
import type { ShoppingCart, Stock } from '@/types/types';
import { useCookie } from '@/useCookie';
import { storeToRefs } from 'pinia';
import { ref, onMounted, type Ref } from 'vue';
import { boolean } from 'yup';


const store = useCartStore();

const { memberCart, localCart } = storeToRefs(store);

const userID: Ref<string | undefined> = ref("");
onMounted(() => {
    userID.value = useCookie();
})

const combineCart = async (memberCart: Stock[], localCart: Stock[], stockID: number) => {
    store.deleteLocalCart(localCart, stockID);
    store.getLocalCart();
    if (
        memberCart?.some((cart: any) => cart.stocks.id === stockID)
    ) {
        store.getMemberCart(userID.value);
    }else {
      if(userID.value) {
        await store.addMemberCart(parseInt(userID.value), stockID);
        store.getMemberCart(userID.value);
      }
    }
}
const rejectCombine = (localCart: Stock[], stockID: number) => {
    store.deleteLocalCart(localCart, stockID);
    store.getLocalCart();
    store.getMemberCart(userID.value);
}
</script>

<template>
  <div>
    <div class=" text-red-600 font-bold text-xl mb-2">注意！</div>
    <p class=" font-bold">ログイン前のカートに商品があります。現在のカートに追加しますか？</p>
    <div class="my-8">
        <ul class="flex justify-start">
          <li class=" w-48 mx-4 border-r border-r-slate-300 " v-for="stock in localCart">
            <div class="w-28">
              <img 
              class="w-full"
              :src="stock.image1" 
              :alt="stock.items?.name"
              >
            </div>
            <p class="w-40 text-ellipsis overflow-hidden whitespace-nowrap mb-2">{{ stock.items?.name }}</p>
            <button class=" text-sm bg-blue-100 w-14 p-1 rounded-xl mx-1" @click="combineCart(memberCart, localCart, stock.id)">追加</button>
            <button class="text-sm bg-slate-100 w-20 p-1 rounded-2xl mx-1" @click="rejectCombine(localCart, stock.id)">キャンセル</button>
          </li>
        </ul>
    </div>          
  </div>

</template>
