import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { supabase } from "@/supabase";

type State = {
  stocks: any[] | [];
  total: number;
  allTotal: number;
  keyword: string;
  series: string;
  images: string[] | [];
}

export const useCounterStore = defineStore("stocks", {
  state: () => ({
    stocks: [],
    total: 0,
    allTotal: 0,
    keyword: "",
    series: "",
    images: [],
  }) as State, 
  getters: {
    getOneItem: (state) => (id: any) => {
        return state.stocks.find(stock => stock.id === id);
    },
  },
  actions: {
    async getAllStocks () {

      try {
          let { data, error, status } = await supabase
              .from("stocks")
              .select("*,items(*)");

          if (error && status !== 406) throw error

          if(data) {
              this.keyword = "";
              this.series = "";
              this.total = 0;
              this.stocks = data;
              this.allTotal = data.length;
          }
      }catch (error: any) {
          console.log(error.message);
      }
    },
    async getSeriesResult (name: string) {
      try {
        let { data, error, status } = await supabase
            .from("stocks")
            .select("*,items(*)");

        if (error && status !== 406) throw error

        if(data) {
            this.keyword = ""
            const result = data.filter((stock: any) => stock.items.series === name);
            this.stocks = result;
            this.series = name;
            this.total = result.length;
        }
      }catch (error: any) {
            console.log(error.message);
      }
    },
    async getSearchResult (keyword: string) {
      try {
        let { data, error, status } = await supabase
            .from("stocks")
            .select("*,items(*)");

        if (error && status !== 406) throw error

        if(data) {
          const result = data.filter((stock: any) => stock.items.name.toLowerCase().includes(keyword.toLowerCase()));
          this.stocks = result;
          this.keyword = keyword;
          this.series = "";
          this.total = result.length;
        }
      }catch (error: any) {
            console.log(error.message);
      }
    }
  }
  // const count = ref(0);
  // const doubleCount = computed(() => count.value * 2);
  // function increment() {
  //   count.value++;
  // }

  // return { count, doubleCount, increment };
});
