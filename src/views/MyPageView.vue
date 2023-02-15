<script lang="ts" setup>
import { useMyPageStore } from "../stores/mypage";
import { useCookie } from "@/useCookie";
import { ref, onMounted, computed } from "vue";
import type { Ref } from "vue";
import SignIn from "../components/signIn/SignIn.vue";
import { storeToRefs } from "pinia";

const userID: Ref<string | undefined> = ref("");
const store = useMyPageStore();
const { favorite, orderItems, usedItems, favoFlag, orderFlag, usedFlag } = storeToRefs(store);

onMounted(() => {
    userID.value = useCookie();
    // お気に入り情報取得
    if(userID.value) {
        store.getFavorite(parseInt(userID.value));
        store.getOrderItems(parseInt(userID.value));
        store.getUsedItems(parseInt(userID.value));
    }    
});

const showAll = (value: string) => {
    if(userID.value) {
        store.controllFlag(parseInt(userID.value), value);
    }
}

const deleteEvent = async (stockID: number) => {
    if(userID.value) {
      await store.deleteFavorite(parseInt(userID.value), stockID);
      store.getFavorite(parseInt(userID.value));
    }  
}

</script>

<template>
    <SignIn>
        <div class="w-3/4 mx-auto">
            <h1 class="my-16 text-3xl font-bold text-slate-700">マイページ</h1>
            <hr />
            <div class="my-16">
                <h2 class="text-lg mb-6 font-bold">
                    お気に入り
                </h2>
                <table>
                    <thead class="bg-blue-50">
                      <tr>
                        <th class="py-5 border border-blue-100">商品名</th>
                        <th class="py-5 border border-blue-100">価格</th>
                        <th class="py-5 border border-blue-100">サイズ</th>
                        <th class="py-5 border border-blue-100">画像</th>
                        <th class="py-5 border border-blue-100">コンディション</th>
                        <th class="py-5 border border-blue-100"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="stock in favorite" :key="stock.stocks.id">
                        <td class="text-center w-1/6 py-5 border border-slate-200">{{ stock.stocks.items?.name }}</td>
                        <td class="text-center w-1/6 py-5 border border-slate-200">￥{{ stock.stocks.price.toLocaleString() }}</td>
                        <td class="text-center w-1/6 py-5 border border-slate-200">{{ stock.stocks.size }}</td>
                        <td class="text-center w-1/6 py-5 border border-slate-200"><img class="w-1/2 mx-auto" :src="stock.stocks.image1" :alt="stock.stocks.items?.name"></td>
                        <td class="text-center w-1/6 py-5 border border-slate-200">{{ stock.stocks.condition }}</td>
                        <td class="text-center w-1/12 py-5 border border-slate-200"><button @click="deleteEvent(stock.stocks.id)">削除</button></td>
                      </tr>
                    </tbody>
                </table>
                <button class="rounded-b-xl text-center w-full p-3 bg-slate-200" v-if="favoFlag" @click="showAll('favo')">閉じる<span class="font-bold">↑</span></button>
                <button class="rounded-b-xl text-center w-full p-3 bg-slate-200" v-else @click="showAll('favo')">全て見る<span class="font-bold">↓</span></button>
            </div>
            <div class="my-16">
                <h2 class="text-lg mb-6 font-bold">
                    購入履歴
                </h2>
                <table>
                    <thead class="bg-blue-50">
                      <tr>
                        <th class="py-5 border border-blue-100">商品名</th>
                        <th class="py-5 border border-blue-100">合計金額</th>
                        <th class="py-5 border border-blue-100">購入日</th>
                        <th class="py-5 border border-blue-100">画像</th>
                        <th class="py-5 border border-blue-100">発送状況</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="stock in orderItems" :key="stock.id">
                        <td class="text-center w-1/5 py-5 border border-slate-200">{{ stock.stocks.items?.name }}</td>
                        <td class="text-center w-1/5 py-5 border border-slate-200">￥{{ stock.orders.total_price.toLocaleString() }}</td>
                        <td class="text-center w-1/5 py-5 border border-slate-200">{{ stock.orders.order_date }}</td>
                        <td class="text-center w-1/5 py-5 border border-slate-200"><img class="w-1/2 mx-auto" :src="stock.stocks.image1" :alt="stock.stocks.items?.name"></td>
                        <td class="text-center w-1/5 py-5 border border-slate-200">{{ stock.orders.ship_status }}</td>
                      </tr>
                    </tbody>
                </table>
                <button class="rounded-b-xl text-center w-full p-3 bg-slate-200" v-if="orderFlag" @click="showAll('order')">閉じる<span class="font-bold">↑</span></button>
                <button class="rounded-b-xl text-center w-full p-3 bg-slate-200" v-else @click="showAll('order')">全て見る<span class="font-bold">↓</span></button>
            </div>
            <div class="my-16">
                <h2 class="text-lg mb-6 font-bold">
                    買取受付状況
                </h2>
                <table>
                    <thead class="bg-blue-50">
                      <tr>
                        <th class="py-5 border border-blue-100">受付状況</th>
                        <th class="py-5 border border-blue-100">受付日</th>
                        <th class="py-5 border border-blue-100">品名</th>
                        <th class="py-5 border border-blue-100">品番</th>
                        <th class="py-5 border border-blue-100">サイズ</th>
                        <th class="py-5 border border-blue-100">色</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="info in usedItems" :key="info.id">
                        <td class="text-center w-1/5 py-5 border border-slate-200">{{ info.status }}</td>
                        <td class="text-center w-1/5 py-5 border border-slate-200">{{ info.reception_date }}</td>
                        <td class="text-center w-1/5 py-5 border border-slate-200">{{ info.item_name }}</td>
                        <td class="text-center w-1/5 py-5 border border-slate-200">{{ info.item_code }}</td>
                        <td class="text-center w-1/5 py-5 border border-slate-200">{{ info.item_size }}</td>
                        <td class="text-center w-1/5 py-5 border border-slate-200">{{ info.item_color }}</td>
                      </tr>
                    </tbody>
                </table>
                <button class="rounded-b-xl text-center w-full p-3 bg-slate-200" v-if="usedFlag" @click="showAll('used')">閉じる<span class="font-bold">↑</span></button>
                <button class="rounded-b-xl text-center w-full p-3 bg-slate-200" v-else @click="showAll('used')">全て見る<span class="font-bold">↓</span></button>
            </div>
        </div>
    </SignIn>
</template>
