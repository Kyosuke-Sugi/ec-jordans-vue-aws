<script lang="ts" setup>
import { useCartStore } from '@/stores/cart';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const store = useCartStore();
const { localCart, total } = storeToRefs(store);

onMounted(() => {
    store.getLocalCart();
})

</script>

<template>
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
        <div class="clear-both float-right my-7">
          <button v-if="localCart.length" class="w-36 h-10 p-2 bg-red-200 rounded-xl text-black shadow">購入画面へ</button>
        </div>
      </div>
    </div>
</template>
