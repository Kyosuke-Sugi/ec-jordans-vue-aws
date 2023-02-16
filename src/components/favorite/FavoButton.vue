<script lang="ts" setup>
import { useMyPageStore } from '@/stores/mypage';
import { useCookie } from '@/useCookie';
import { storeToRefs } from 'pinia';
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

const data = defineProps(['favo']);

const stock = computed(() => {
    return data?.favo
})

const router = useRouter();
const userID: any = ref("")
const store = useMyPageStore();
const { favorite } = storeToRefs(store);

onMounted(() => {
    userID.value = useCookie();
    if(userID.value) {
      store.getFavorite(userID.value);
    }
});

const addFavo = async (stock: any) => {
  const userID = useCookie();

  if(userID) {
    await store.addFavorite(parseInt(userID), stock.id);
    store.getFavorite(parseInt(userID));
  }else {
    router.push("/login");
  }
}
</script>

<template>
    <div v-if="userID">
        <button
          v-if="favorite.some((favoList) => favoList.stocks.id === stock.id)" 
          disabled 
          class=" w-36 h-20 p-2 bg-slate-400 rounded-xl text-black shadow"
        >
            お気に入りに追加済み
        </button>
        <button 
          v-else 
          @click="addFavo(stock)" 
          class=" w-36 h-20 p-2 bg-amber-200 rounded-xl text-black shadow"
        >
            お気に入りに追加
        </button>
    </div>
    <div v-else>
        <button @click="addFavo(stock)" class=" w-36 h-20 p-2 bg-amber-200 rounded-xl text-black shadow">お気に入りに追加</button>
    </div>
</template>
