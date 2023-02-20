<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import MyHeader from "./components/MyHeader.vue";
import MyFooter from "./components/MyFooter.vue";
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";

import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);
</script>

<template>
  <authenticator>
    <template v-slot="{ user, signOut }">
      <MyHeader />
      <RouterView />
      <MyFooter :user="user" :signOut="signOut" />
    </template>
  </authenticator>
</template>
