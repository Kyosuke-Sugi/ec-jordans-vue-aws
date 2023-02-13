import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { supabase } from "@/supabase";

type State = {
  stocks: any[] | [];
  total: number;
  allTotal: number;
  keyword: string;
  series: string;
  page: number,
  limit: number,
  images: string[] | [];
}

export const useCounterStore = defineStore("stocks", {
  state: () => ({
    stocks: [],
    total: 0,
    allTotal: 0,
    keyword: "",
    series: "",
    page: 1,
    limit: 15,
    images: [],
  }) as State, 
  getters: {
    getOneItem: (state) => (id: any) => {
        return state.stocks.find(stock => stock.id === id);
    },
  },
  actions: {
    async getAllSize () {
      try {
          let { data, error, status } = await supabase
              .from("stocks")
              .select("*,items(*)");

          if (error && status !== 406) throw error

          if(data) {
              this.allTotal = data.length;
          }
      }catch (error: any) {
          console.log(error.message);
      }
    },
    async getPagingStocks (page: number, limit: number) {
      const start = limit * (page - 1);
      const end = start + limit - 1;
      try {
        let { data, error, status } = await supabase
            .from("stocks")
            .select("*,items(*)")
            .range(start, end);

        if (error && status !== 406) throw error

        if(data) {
            this.keyword = "";
            this.series = "";
            this.total = 0;
            this.stocks = data;
        }
    }catch (error: any) {
        console.log(error.message);
    }
    },
    prevPage () {
      this.page--;
      window.scrollTo(0, 0);
    },
    nextPage () {
      this.page++;
      window.scrollTo(0, 0);
    },
    jumpPage (num: number) {
      this.page = num;
      window.scrollTo(0, 0);
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
            this.allTotal = data.length;
            window.scrollTo(0, 0);
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
          this.allTotal = data.length;
<<<<<<< HEAD
          window.scrollTo(0, 0);
=======
>>>>>>> origin/main
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
