import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { supabase } from "@/supabase";

type User = {
    userID: string;
    password: string;
    flag: boolean
}

export const useLoginStore = defineStore("login", {
  state: () => ({
    userID: "",
    password: "",
    flag: false
  }) as User, 
  getters: {
    
  },
  actions: {
    async addInfo (info: any) {
        try {
            const checkData = await supabase
              .from("users")
              .select()
              .eq("email", info.userID)
              .eq("password", info.password);
        
            if (!checkData.data) return;
            const obj = await checkData.data[0];
            
            if (obj === undefined) {
              this.flag = true;
              throw Error;
            } else {
              this.userID = obj.id
              this.password = obj.password
              this.flag = false
              document.cookie = `userID=${obj.id}; Path=/; `
            }
            console.log(info)

        } catch (error) {
            console.error(error);
            this.flag = true
        }
    }
  }

});
