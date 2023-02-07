<script setup>
import ItemInfo from "../components/ItemInfo.vue";
import { useRoute } from "vue-router";
import { onMounted, ref } from "@vue/runtime-core";
import { supabase } from "../supabase";

const router = useRoute();
const stock = ref({});
onMounted(() => {
    const id = router.params.id
    getItemInfo(id)
})

const getItemInfo = async(id) => {
    try {
        let { data, error, status } = await supabase
            .from("stocks")
            .select("*,items(*)")
            .eq("id", id)

        if (error && status !== 406) throw error

        if(data) {
            stock.value = data[0];
            console.log(stock.value);
        }
    }catch (error) {
        alert(error.message);
    }
} 
</script>


<template>
    <p>id: {{ stock.price }}</p>
    <ItemInfo v-if="stock" :test="stock" />
</template>
