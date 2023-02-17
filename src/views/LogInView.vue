<script lang="ts" setup>
import { ref, type Ref } from 'vue';
import { useLoginStore } from "@/stores/user";
import { storeToRefs } from 'pinia';
import type { UserInfo } from '@/types/types';

const store = useLoginStore()
const userID: Ref<string | undefined> = ref("");
const password: Ref<string | undefined> = ref("");
const { flag } = storeToRefs(store);

const loginCheck = () => {
    const info: UserInfo = {
        userID: userID.value,
        password: password.value
    }
    store.addInfo(info);
}

</script>

<template>
    <div class="w-1/2 mx-auto my-4">
      <div class="w-1/2 mx-auto my-9">
          <h1 class="text-2xl my-6 font-bold">ログイン</h1>
          <p class="text-lg py-3">メールアドレス</p>
          <input
            class=" border-slate-800 bg-slate-100 p-2 w-full"
            placeholder="sample@example.com"
            type="text"
            name="id"
            v-model="userID"
          />
          <p class="text-lg py-3">パスワード</p>
          <input
            class=" border-slate-800 bg-slate-100 p-2 w-full"
            type="password"
            placeholder="Password"
            name="pw"
            v-model="password"
          />
          <br />
          <div class="text-center">
            <button 
              class=" my-4 w-24 h-10 p-2 bg-[#35325c] rounded-xl text-white shadow"
              @click="loginCheck"
            >
              ログイン
            </button>
          </div>
          <p class="text-center text-red-600 font-semibold" v-if="flag">ログインできませんでした<br>メールアドレスとパスワードを確認してください</p>
      </div>
      </div>
</template>
