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
    // //ログアウト状態のアクション
    getLocalCart () {
        const storage = localStorage.getItem("shoppingCart");
        if(storage || storage?.length) {
            const data = JSON.parse(storage)
            this.localCart = data
            this.total = this.localCart.map((stock) => stock.price)
            .reduce((prev: number, curr: number) => prev + curr, 0);
        }
    },
    addLocalCart (stock: any) {
      const storage = localStorage.getItem("shoppingCart");
      if(storage || storage?.length) {
        const local = JSON.parse(storage)
        local.unshift(stock);
        localStorage.setItem("shoppingCart", JSON.stringify(local));
      } else {
        localStorage.setItem("shoppingCart", JSON.stringify([stock]))
      }
    },
    deleteLocalCart (localCart: any, id: number) {
      const deleted = localCart.filter((item: any) => item.id !== id)
      localStorage.setItem("shoppingCart", JSON.stringify(deleted))
    },
    // ログイン状態のアクション
    async getMemberCart (id: any) {
      try {
        let { data, error, status } = await supabase
        .from("shopping_cart")
        .select(`*,stocks(*,items(*))`)
        .eq("user_id", id);

        if (error && status !== 406) throw error

        if(data) {
            this.memberCart = data;
            this.total = this.memberCart.map((stock) => stock.stocks.price)
            .reduce((prev: number, curr: number) => prev + curr, 0);
        }
      }catch (error: any) {
          console.log(error.message);
      }
    },
    async addMemberCart (userID: number, stockID: number) {
      try {
        let { data, error, status } = await supabase
        .from("shopping_cart")
        .insert([
          {
            user_id: userID,
            stock_id: stockID
          },
        ]);

        if (error && status !== 406) throw error

        if(data) {
        }
      }catch (error: any) {
        console.log(error.message);
      }
    },
    async deleteMemberCart (userID: number, stockID: number) {
      try {
        let { data, error, status } = await supabase
        .from("shopping_cart")
        .delete()
        .eq("user_id", userID)
        .eq("stock_id", stockID);

        if (error && status !== 406) throw error

      }catch (error: any) {
          console.log(error.message);
      }
    }
  }

});
