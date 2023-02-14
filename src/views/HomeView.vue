<script setup lang="ts">
import SearchBox from "../components/SearchBox.vue";
import SideBar from "../components/SideBar.vue";
import ItemList from "../components/ItemList.vue";
import PagingList from "@/components/PagingList.vue";
</script>

<template>
  <main>
    <div>
      <div class="flex justify-start">
        <SideBar />
        <div class="w-4/5">
          <SearchBox />
          <div class="my-7">
            <ItemList />
          </div>
          <PagingList />
        </div>
      </div>
    </div>
  </main>
</template>
