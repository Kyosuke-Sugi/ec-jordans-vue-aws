<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

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
