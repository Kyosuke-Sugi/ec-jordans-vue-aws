<script lang="ts" setup>
import { useCookie, useName } from '@/useCookie';
import { useLoginStore } from '@/stores/user';
import { watch, ref, onMounted } from 'vue';
import type { Ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useLoginStore();

const userID: Ref<string | undefined> = ref("");
const userName: Ref<string | undefined> = ref("");

watch(router.currentRoute, () => {
  userID.value = useCookie();
  userName.value = useName();
})

const logoutEvent = () => {
  store.removeInfo();
  location.reload();
}

</script>

<template>
    <header class="w-full">
    <div class="bg-[#f2f3f7] w-full my-0 mx-auto py-3 flex justify-between items-center fixed top-0 z-50">
      <div class="w-[300px]">
        <RouterLink to="/" class="text-[#35325c] font-['Georgia'] font-bold text-3xl ml-3" >JORDANS</RouterLink>
      </div>
      <nav class="w-1/2">
        <ul class="flex justify-around text-center">
          <li key="mypage" class="text-[#2c3047ba] w-full">
            <RouterLink to="/cart" class="p-5">
              <span>カート</span>
            </RouterLink>
          </li>
          <li key="contact" class="text-[#2c3047ba] w-full">
            <RouterLink to="/contact" class="p-5">
              <span>お問い合わせ</span>
            </RouterLink>
          </li>
          <li key="purchase" class="text-[#2c3047ba] w-full">
            <RouterLink to="/purchase" class="p-5">
              <span>買取受付</span>
            </RouterLink>
          </li>
          <li v-if="userID" key="mypage" class="text-[#2c3047ba] w-full">
            <RouterLink to="/mypage" class="p-5">
              {{ userName }}さん
            </RouterLink>
          </li>
          <li v-else key="signup" class="text-[#2c3047ba] w-full">
            <RouterLink to="/signup" class="p-5">
              <span>会員登録</span>
            </RouterLink>
          </li>
          <li v-if="userID" key="logout" class="text-[#2c3047ba] w-full">
            <button @click="logoutEvent">ログアウト</button>
          </li>
          <li v-else key="login" class="text-[#2c3047ba] w-full">
            <RouterLink to="/login" class="p-5">
              <span>ログイン</span>
            </RouterLink>
          </li>
        </ul>
      </nav>
    </div>
    <img src="../assets/images/header.jpg" alt="ヘッダー画像" class="w-full">
  </header>
</template>
