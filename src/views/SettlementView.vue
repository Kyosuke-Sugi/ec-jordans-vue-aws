<script lang="ts" setup>
import SignIn from "../components/signIn/SignIn.vue";
import AddressInfo from "../components/settlement/AddressInfo.vue";
import { ref, onMounted } from "vue";
import { useCartStore } from "@/stores/cart";
import { storeToRefs } from "pinia";
import { useCookie } from "@/useCookie";
import { useRouter } from "vue-router";

const userID: any = ref("");
const payment = ref("");
const store = useCartStore();
const router = useRouter();

const { memberCart, total, localCart } = storeToRefs(store);

onMounted(async () => {
    userID.value = useCookie();
    await store.getMemberCart(userID.value);
    console.log(memberCart.value);
});

const purchase = () => {
  alert("購入しました");
  router.push('/')
}
</script>

<template>
    <SignIn>
        <h1 class="w-3/4 mx-auto my-16 text-3xl font-bold text-slate-700">購入手続き</h1>
        <div class=" w-3/4 mx-auto flex justify-around">
            <div class="w-2/3">
                <AddressInfo />
                <div class="mb-10">
                  <h2 class="text-lg mb-6 font-bold">購入商品</h2>
                  <table>
                    <thead class="bg-blue-50">
                      <tr>
                        <th class="py-5 border border-blue-100">商品名</th>
                        <th class="py-5 border border-blue-100">個数</th>
                        <th class="py-5 border border-blue-100">価格</th>
                        <th class="py-5 border border-blue-100">画像</th>
                        <th class="py-5 border border-blue-100">コンディション</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="cart in memberCart" :key="cart.stocks.id">
                        <td class="text-center w-1/5 py-5 border border-slate-200">{{ cart.stocks.items?.name }}</td>
                        <td class="text-center w-1/5 py-5 border border-slate-200">{{ cart.stocks.amount }}</td>
                        <td class="text-center w-1/5 py-5 border border-slate-200">￥{{ cart.stocks.price.toLocaleString() }}</td>
                        <td class="text-center w-1/5 py-5 border border-slate-200"><img class="w-1/2 mx-auto" :src="cart.stocks.image1" :alt="cart.stocks.items?.name"></td>
                        <td class="text-center w-1/5 py-5 border border-slate-200">{{ cart.stocks.condition }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="mb-10">
                  <h2 class="text-lg mb-6 font-bold">
                    <span class="bg-red-700 text-white p-1 rounded-lg mr-3">必須</span>支払い方法
                  </h2>
                  <div class="text-lg mb-6">
                    <input
                      type="radio"
                      id="credit"
                      name="支払い方法"
                      value="credit"
                      required
                      v-model="payment"
                    />
                    <label htmlFor="credit">
                      クレジット
                    </label><br>
                    <input
                    type="radio"
                    id="cashOnDelivery"
                    name="支払い方法"
                    value="cashOnDelivery"
                    v-model="payment"
                    />
                    <label htmlFor="cashOnDelivery">
                      代引き(手数料 + ￥330)
                    </label>
                  </div>
                </div>
                <div class="mb-10">
                    <h2 class="text-lg mb-6 font-bold">発送予定日</h2>
                    <p>購入日から3～5営業日以内に発送いたします</p>
                </div>
                <div class="mb-14" id="changeAddress">
                    <p>
                      発送先の住所を変更をご希望の際は備考欄にて【郵便番号・住所（建物名・号室）・宛名】をご記入下さい。
                      <br /> 下記をコピーしてお使いください。
                      <br />
                    ----------------------------
                      <br /> 郵便番号:
                      <br /> 住所（建物名・号室）:
                      <br /> 宛名:
                    </p>
                    <div class="my-10">
                      <label htmlFor="note">
                        備考
                      </label>
                      <br />
                      <textarea
                        class="bg-slate-100 w-96 h-48"
                        id="note"
                        placeholder="宛先変更があればご記入ください"
                      ></textarea>
                    </div>
                </div>
            </div>
            <div class="w-1/3 mr-14">
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
                    <dl v-if="payment === 'cashOnDelivery'" class="flex justify-between p-3 mb-2 float-right">
                      <dt>手数料:</dt>
                      <dd>￥{{ 330 }}</dd>
                    </dl>
                  </div>
                  <div class="float-right clear-both text-xl font-bold border-b-2 border-[#ccc] p-3 mb-2">
                    <div v-if="memberCart?.length">
                      <p v-if="payment === 'cashOnDelivery'">
                        合計：￥{{ (total + 500 + 330).toLocaleString() }}（税込）
                      </p>
                      <p v-else>合計：￥{{ (total + 500).toLocaleString() }}（税込）</p>
                    </div>
                    <p v-else>合計：￥{{ total.toLocaleString() }}（税込）</p>
                  </div>
                  <div class="clear-both float-right my-7">
                    <RouterLink to="/settlement">
                      <button 
                        :disabled="payment === ''" 
                        class="disabled:opacity-70 w-36 h-10 p-2 bg-red-500 rounded-xl text-white shadow"
                        @click="purchase"
                      >
                        購入する
                      </button>
                    </RouterLink>
                  </div>
                  <div class="clear-both float-right">
                    <RouterLink to="/cart">
                      <button 
                        class="w-36 h-10 p-2 bg-gray-400 rounded-xl text-white shadow"
                      >
                        カートに戻る
                      </button>
                    </RouterLink>
                  </div>
                </div>
            </div>
        </div>
        
    </SignIn>
</template>
