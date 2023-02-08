import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { supabase } from "@/supabase";

type Cart = {
  localCart: any[] | [];
  memberCart: any[] | [];
  total: number
}

export const useCartStore = defineStore("cart", {
  state: () => ({
    localCart: [],
    memberCart: [],
    total: 0
  }) as Cart, 
  getters: {
    
  },
  actions: {
    getLocalCart () {
        const storage = localStorage.getItem("shoppingCart");
        if(storage || storage?.length) {
            const data = JSON.parse(storage)
            this.localCart = data
            this.total = this.localCart.map((stock) => stock.price)
            .reduce((prev: number, curr: number) => prev + curr, 0);
        }
    },
  }

});
