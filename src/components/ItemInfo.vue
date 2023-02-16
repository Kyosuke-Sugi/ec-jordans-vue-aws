<script setup lang="ts">
import { useCookie } from "@/useCookie";
import { ref, toRef } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { computed } from "vue";
import { useRouter } from "vue-router";
import FavoButton from "../components/favorite/FavoButton.vue";
import CartButton from "../components/cart/CartButton.vue";
import { useCounterStore } from "@/stores/counter";
import { storeToRefs } from "pinia";

const stock  = defineProps(['detail']);
const store = useCounterStore();
const { images } = storeToRefs(store);

const data = computed(() => {
    return stock?.detail
})

onMounted(() => {
  store.getImages(data.value);
})

const changeImage = (num: number) => {
  store.sortImage(num);
}

</script>

<template>
    <div class="w-3/4 mx-auto my-16 text-[#55565a]">
        <div>
            <h1 class="text-3xl my-10">{{ data.items?.name }}</h1>
            <p>年代：{{ data.items?.year }}</p>
            <p>色：{{ data.items?.color }}</p>
        </div>
        <div class="flex justify-between items-center">
            <div class="w-1/3">
              <div class="w-full grid grid-rows-1 grid-cols-5 gap-y-2">
                  <div class="col-span-5">
                    <img :src="'/' + images[0]" alt="イメージ１" class="w-full">
                  </div>
                  <div class="row-span-1 col-span-1" v-for="(image, num) in images.filter((_, i) => i !== 0)">
                    <input 
                      type="checkbox"
                      :id="'image' + num"
                      :name="'image' + num" 
                      class="peer hidden w-full"
                      :checked="images[0] === image"
                      :disabled="images[0] === image"
                      @change="changeImage(num)"
                    >
                    <label :htmlFor="'image' + num" class="peer-checked:opacity-40 cursor-pointer">
                      <img :src="'/' + image" :alt="'image' + num " class="w-full">
                    </label>
                  </div>
              </div>
              <p class="text-sm my-4">※クリックすると画面に表示されます</p>
            </div>
            <div class="w-96 mr-14">
                <div class="text-xl text-[#]">
                  <dl class="flex justify-between border-b-2 border-[#ccc] p-3 mb-2">
                    <dt>価格（税込）</dt>
                    <dd>￥{{ data.price }}</dd>
                  </dl>
                  <dl class="flex justify-between border-b-2 border-[#ccc] p-3 mb-2">
                    <dt>サイズ</dt>
                    <dd>{{ data.size }}</dd>
                  </dl>
                  <dl class="flex justify-between border-b-2 border-[#ccc] p-3 mb-2">
                    <dt>在庫数</dt>
                    <dd>{{ data.amount }}</dd>
                  </dl>
                  <dl class="flex justify-between border-b-2 border-[#ccc] p-3 mb-7">
                    <dt>コンディション</dt>
                    <dd>{{ data.condition }}</dd>
                  </dl>
                </div>
                <div class="flex justify-around">
                  <FavoButton :favo="data" />
                  <CartButton :cart="data" />
                </div>
            </div>
        </div>
        <div class="my-10">
          <h2 class="text-xl font-bold my-5">商品説明</h2>
          <p>
            {{ data.items.description }}
          </p>
        </div>
    </div>
</template>
