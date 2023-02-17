<script lang="ts" setup>
import { useCookie } from "@/useCookie";
import { ref, onMounted, type Ref } from "vue";
import LocalCart from "../components/cart/LocalCart.vue"
import MemberCart from "../components/cart/MemberCart.vue"

const userID: Ref<string | undefined> = ref("");

onMounted(() => {
    userID.value = useCookie();
})

</script>

<template>
    <MemberCart v-if="userID" />
    <LocalCart v-else />
</template>
