<script lang="ts" setup>
const data = defineProps(["user", "signOut"]);
const user = data.user;
const signOut = data.signOut;
</script>


<template>
    <footer class="w-full">
      <div class="bg-[#dde5eb] flex justify-between p-7">
        <div class="w-1/2 px-7">
          <ul>
            <li class="p-3">
              <RouterLink to="/purchase">買取受付</RouterLink>
            </li>
            <li class="py-1 px-3">
              <RouterLink to="/contact">お問い合わせ</RouterLink>
            </li>
          </ul>
          <div class="mt-3 px-3">
            SNS
          </div>
        </div>
        <div class="w-1/2 text-right">
          <h3>- 運営会社 -</h3>
          <p>
            株式会社JORDANS
            <br />
            〒160-0022 <br />
            東京都新宿区新宿2-5-12 FORECAST新宿AVENUE8階
            <br />
            MAIL : jordans@rakus-partners.co.jp
            <br />
          </p>
        </div>
      </div>
      <div class="flex justify-end items-center text-center bg-orange-400 border border-orange-600">
        <p class="m-3 text-white">AWS 認証ID: <span class="mx-2 font-bold">{{ user.username }}</span></p>
        <button class="m-3 p-2 bg-orange-100 rounded-md text-orange-600 hover:bg-yellow-300 transition" @click="signOut">Sign Out</button>
      </div>
    </footer>
</template>
