import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { supabase } from "@/supabase";

type State = {
  stocks: any[] | [];
  images: string[] | [];
}

export const useCounterStore = defineStore("stocks", {
  state: () => ({
    stocks: [],
    images: [] 
  }) as State, 
  getters: {
    getOneItem: (state) => (id: any) => {
        return state.stocks.find(stock => stock.id === id);
    }
  },
  actions: {
    async getAllStocks () {

      try {
          let { data, error, status } = await supabase
              .from("stocks")
              .select("*,items(*)");

          if (error && status !== 406) throw error

          if(data) {
              this.stocks = data;
          }
      }catch (error: any) {
          console.log(error.message);
      }
    },

  }
  // const count = ref(0);
  // const doubleCount = computed(() => count.value * 2);
  // function increment() {
  //   count.value++;
  // }

  // return { count, doubleCount, increment };
});
