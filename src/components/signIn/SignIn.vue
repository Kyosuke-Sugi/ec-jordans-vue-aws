<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRouter, type Router } from 'vue-router';

const router: Router = useRouter();

onMounted(() => {
    const cookie = document.cookie;
    if (cookie === "" || undefined) {
        router.push("/login");
    } 
})

</script>

<template>
    <slot></slot>
</template>
