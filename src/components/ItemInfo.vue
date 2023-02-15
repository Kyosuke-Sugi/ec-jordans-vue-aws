<script setup lang="ts">
import { useCookie } from "@/useCookie";
import { ref, toRef } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { computed } from "vue";
import { useRouter } from "vue-router";
import FavoButton from "../components/favorite/FavoButton.vue";
import CartButton from "../components/cart/CartButton.vue";

const stock  = defineProps(['detail']);
const router = useRouter();

const data = computed(() => {
    return stock?.detail
})

const addFavo = () => {
  const userID = useCookie();

  if(userID) {
    console.log("お気に入り成功");
  }else {
    router.push("/login");
  }
}

console.log(stock);
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
                <div class="mb-5">
                    <img :src="'/' + data.image1" :alt="data.items?.name" class="w-full">
                </div>
                <ul class="w-full flex">
                    <li class="w-1/3"><img :src="'/' + data.image2" :alt="data.items?.name" class="w-full"></li>
                    <li class="w-1/3"><img :src="'/' + data.image3" :alt="data.items?.name" class="w-full"></li>
                    <li class="w-1/3"><img :src="'/' + data.image4" :alt="data.items?.name" class="w-full"></li>
                </ul>
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
    </div>
</template>
