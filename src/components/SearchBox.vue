<script lang="ts" setup>
import { ref, type Ref } from 'vue';
import { useCounterStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';

const store = useCounterStore();
const { page, limit } = storeToRefs(store);
const keyword: Ref<string | undefined> = ref("");

const handleSearch = (e: Event) => {
  e.preventDefault();
  if(keyword.value) {
    store.getSearchResult(keyword.value);
  }else {
    store.getPagingStocks(page.value, limit.value);
  }
}

</script>

<template>
    <form class="flex justify-center items-center">
      <input
        type="text"
        name="filter"
        placeholder="商品名検索"
        class="bg-[#eee] my-6 w-72 px-3 py-2 rounded-xl"
        v-model="keyword"
      />
      <div>
        <button @click="handleSearch" class="w-14 h-8 my-6 bg-[#35325c] text-white rounded-2xl ml-2">
            検索
        </button>
      </div>
    </form>
</template>
