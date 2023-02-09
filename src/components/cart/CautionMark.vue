<script lang="ts" setup>
import { useCartStore } from '@/stores/cart';
import { useCookie } from '@/useCookie';
import { storeToRefs } from 'pinia';
import { ref, onMounted } from 'vue';


const store = useCartStore();

const { memberCart, localCart } = storeToRefs(store);

const userID: any = ref("");
onMounted(() => {
    userID.value = useCookie();
})

const combineCart = async (memberCart: any, localCart: any, stockID: number) => {
    store.deleteLocalCart(localCart, stockID);
    store.getLocalCart();
    if (
        memberCart?.some((cart: any) => cart.stocks.id === stockID)
    ) {
        store.getMemberCart(userID.value);
    }else {
        await store.addMemberCart(userID.value, stockID);
        store.getMemberCart(userID.value);
    }
}
const rejectCombine = (localCart: any, stockID: number) => {
    store.deleteLocalCart(localCart, stockID);
    store.getLocalCart();
    store.getMemberCart(userID.value);
}
</script>

<template>
    <div>
        <div>
          <div>注意！</div>
          <p>ログイン前のカートに商品があります。</p>
          <p>現在のアカウントのカートにその商品を移動しますか？</p>
          <div>
              <p>ゲストのカート内</p>
              <ul>
                <li v-for="stock in localCart">
                  <div class=" w-28">
                    <img 
                    class="w-full"
                    :src="stock.image1" 
                    :alt="stock.items?.name"
                    >
                  </div>
                  <p>{{ stock.items?.name }}</p>
                  <button @click="combineCart(memberCart, localCart, stock.id)">カートに入れる</button>
                  <button @click="rejectCombine(localCart, stock.id)">キャンセル</button>
                </li>
              </ul>
          </div>
          
        </div>
      </div>
</template>
