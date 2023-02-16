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
    // 全商品情報取得
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
    // 全商品の数取得
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
    // 商品画像のみ取得
    getImages (data: any) {
      const arr = [];
      arr.push(data.image1, data.image1, data.image2, data.image3, data.image4, data.image5);
      this.images = arr;
    },
    // 商品画像の順番入れ替え
    sortImage (num: number) {
      this.images.splice(0, 1, this.images[num + 1]);
    },
    // ページング機能実装
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
    // 絞り込み機能実装
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
    // 検索機能実装
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
          window.scrollTo(0, 0);

        }
      }catch (error: any) {
            console.log(error.message);
      }
    }
  }
});
