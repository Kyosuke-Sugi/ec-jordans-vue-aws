<script lang="ts" setup>
import { useCookie } from "@/useCookie";
import { ref, onMounted } from "vue";
import LocalCart from "../components/cart/LocalCart.vue"
import MemberCart from "../components/cart/MemberCart.vue"

const userID: any = ref("");

onMounted(() => {
    userID.value = useCookie();
    console.log(userID.value);
})

</script>

<template>
    <MemberCart v-if="userID" />
    <LocalCart v-else />
</template>
