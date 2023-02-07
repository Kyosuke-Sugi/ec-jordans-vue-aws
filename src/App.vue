<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import MyHeader from "./components/MyHeader.vue";
import SearchBox from "./components/SearchBox.vue";
</script>

<template>
  <MyHeader />
  <RouterView />
</template>
