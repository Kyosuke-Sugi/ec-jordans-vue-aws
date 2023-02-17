<script lang="ts" setup>
import { useCookie, useName } from '@/useCookie';
import { useLoginStore, type User } from '@/stores/user';
import { watch, ref } from 'vue';
import type { Ref } from 'vue';
import { useRouter, type Router } from 'vue-router';
import type { Store } from 'pinia';
import type { UserInfo } from "../types/types";
import { 
  ShoppingCartIcon, 
  ChatBubbleLeftEllipsisIcon,
  CurrencyYenIcon,
  UserPlusIcon,
  UserIcon
} from '@heroicons/vue/20/solid'

const router: Router = useRouter();
const store: Store<"login", User, {}, {
    addInfo(info: UserInfo): Promise<void>;
    removeInfo(): void;
}> = useLoginStore();

const userID: Ref<string | undefined> = ref("");
const userName: Ref<string | undefined> = ref("");

watch(router.currentRoute, () => {
  userID.value = useCookie();
  userName.value = useName();
})

const logoutEvent: () => void = () => {
  store.removeInfo();
  location.reload();
}

const logInEvent: () => void = () => {
  router.push("/login");
}

</script>

<template>
    <header class="w-full">
    <div class="bg-[#f2f3f7] w-full my-0 mx-auto py-3 flex justify-between items-center fixed top-0 z-50">
      <div class="w-[300px]">
        <RouterLink to="/" class="text-[#35325c] font-['Georgia'] font-bold text-3xl ml-3" >JORDANS</RouterLink>
      </div>
      <nav class="w-2/3 min-w-[600px]">
        <ul class="flex justify-around items-center text-center">
          <li key="mypage" class="text-[#2c3047ba] w-1/5 mx-3">
            <RouterLink to="/cart" class="flex justify-center">
              <ShoppingCartIcon class="w-6" />
              <p class="px-3">カート</p>
            </RouterLink>
          </li>
          <li key="contact" class="text-[#2c3047ba] w-1/5 mx-3">
            <RouterLink to="/contact" class="flex justify-center">
              <ChatBubbleLeftEllipsisIcon class="w-6" />
              <p class="px-3">お問い合わせ</p>
            </RouterLink>
          </li>
          <li key="purchase" class="text-[#2c3047ba] w-1/5 mx-3">
            <RouterLink to="/purchase" class="flex justify-center">
              <CurrencyYenIcon class="w-6" />
              <p class="px-3">買取受付</p>
            </RouterLink>
          </li>
          <li v-if="userID" key="mypage" class="text-[#2c3047ba] w-1/5">
            <RouterLink to="/mypage" class="flex justify-center">
              <UserIcon class="w-6" />
              <p class="px-3">{{ userName }}さん</p>
            </RouterLink>
          </li>
          <li v-else key="signup" class="text-[#2c3047ba] w-1/5 mx-3">
            <RouterLink to="/signup" class="flex justify-center">
              <UserPlusIcon class="w-6" />
              <p class="px-3">会員登録</p>
            </RouterLink>
          </li>
          <li v-if="userID" key="logout" class="text-[#2c3047ba] w-1/5">
            <button class="px-4 py-2 w-24 bg-cyan-400 shadow rounded-lg text-white font-bold" @click="logoutEvent">ログアウト</button>
          </li>
          <li v-else key="login" class="text-[#2c3047ba] w-1/5">
            <button class="px-4 py-2 w-24 bg-cyan-400 shadow rounded-lg text-white font-bold" @click="logInEvent">ログイン</button>
          </li>
        </ul>
      </nav>
    </div>
    <img src="../assets/images/header.jpg" alt="ヘッダー画像" class="w-full">
  </header>
</template>
