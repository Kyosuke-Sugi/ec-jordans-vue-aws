<script lang="ts" setup>
import  ItemInfo  from "../components/ItemInfo.vue";
import { useRoute } from "vue-router";
import { onMounted, ref } from "@vue/runtime-core";
import { supabase } from "../supabase";
import type { Ref } from "vue";

const router = useRoute();
const stock: Ref<any> = ref({});
onMounted(() => {
    const id: number = parseInt(router.params.id)
    getItemInfo(id);
})

const getItemInfo = async(id: any) => {
    try {
        let { data, error, status } = await supabase
            .from("stocks")
            .select("*,items(*)")
            .eq("id", id)
            
            if (error && status !== 406) throw error
            
            if(data) {
                stock.value = data[0];
                console.log(stock.value);
                console.log(stock);
            }
        }catch (error: any) {
        alert(error.message);
    }
} 
</script>


<template>
    <ItemInfo v-if="stock" :detail="stock" />
</template>
