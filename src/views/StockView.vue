<script lang="ts" setup>
import  ItemInfo  from "../components/ItemInfo.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";
import { useCounterStore } from "@/stores/counter";

const router = useRoute();
const store = useCounterStore();
const stock = computed(() => {
    const id: number = parseInt(router.params.id as string);
    if(store.stocks.length) {
        return store.getOneItem(id);
    }else {
        store.getAllStocks();
        return store.getOneItem(id);
    }
})

</script>


<template>
    <ItemInfo v-if="stock" :detail="stock" />
</template>
