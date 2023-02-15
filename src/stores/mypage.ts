import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { supabase } from "@/supabase";

type MyPage = {
  favorite: any[] | [];
  orderItems: any[] | [];
  usedItems: any[] | [];
  favoFlag: boolean;
  orderFlag: boolean;
  usedFlag: boolean;
}

export const useMyPageStore = defineStore("mypage", {
  state: () => ({
    favorite: [],
    orderItems: [],
    usedItems: [],
    favoFlag: false,
    orderFlag: false,
    usedFlag: false
  }) as MyPage, 
  getters: {
    getPartOrder: (state: any) => {
        return state.orderItems.slice(0, 4);
    }
  },
  actions: { 
    controllFlag (userID: number, value: string) {
        switch(value) {
            case 'favo':
                this.favoFlag = !this.favoFlag;
                this.getFavorite(userID);
                break;
            
            case 'order':
                this.orderFlag = !this.orderFlag;
                this.getOrderItems(userID);
                break;
            
            case 'used':
                this.usedFlag = !this.usedFlag;
                this.getUsedItems(userID);
                break;
        }
    },
    // controllOrderFlag () {
    //     this.orderFlag = !this.orderFlag
    // },
    // controllUsedFlag () {
    //     this.usedFlag = !this.usedFlag
    // },
    async getFavorite (userID: number) {
        try {
            const { data, error, status } = await supabase
              .from("favorite_items")
              .select("id,user_id,stocks(item_id,image1,size,price,condition,items(name))")
              .eq("user_id", userID)
              .order("id", { ascending: false });
        
            if(error && status !== 406) throw error;

            if(data) {
                this.favorite = data
            }

        } catch (error) {
            console.error(error);
        }
    },
    async getOrderItems (userID: number) {
        try {
            const { data: getData, error: getError, status } = await supabase
                    .from("order_items")
                    .select("id,orders(ship_status,payment_method,order_date,total_price),user_id,stocks(item_id,image1,size,price,condition,items(name))")
                    .eq("user_id", userID)
                    .order("id", { ascending: false });
    
                if (getError && status !== 406) return getError; 
                
                if(getData) {
                    if(this.orderFlag) {
                        this.orderItems = getData;
                    }else {
                        this.orderItems = getData.slice(0, 2);
                    }
                }
    
        }catch (getError) {
            console.error(getError)
        }
    },
    async getUsedItems (userID: number) {
        try {
            const { data: getUsedData, error: getUsedError, status } = await supabase
                .from("used_items")
                .select()
                .eq("user_id", userID)
                .order("id", { ascending: false });
    
                if (getUsedError && status !== 406) return getUsedError; 
                
                if(getUsedData) {
                    if(this.usedFlag) {
                        this.usedItems = getUsedData;
                    }else {
                        this.usedItems = getUsedData.slice(0, 2);
                    }
                }
    
        }catch (getError) {
            console.error(getError)
        }
    }
    
  }

});
