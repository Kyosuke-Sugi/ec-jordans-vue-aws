<script setup lang="ts">
import SearchBox from "../components/SearchBox.vue";
import SideBar from "../components/SideBar.vue";
import ItemList from "../components/ItemList.vue";
</script>

<template>
  <main>
    <div>
      <div class="flex justify-start">
        <SideBar class="w-1/5" />
        <div class="w-4/5">
          <SearchBox />
          <ItemList class="my-7" />
        </div>
      </div>
    </div>
  </main>
</template>
