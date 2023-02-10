import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { supabase } from "@/supabase";
import { useRouter } from "vue-router";

type User = {
    userID: string;
    password: string;
    flag: boolean
}

const router = useRouter();

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

              const now = new Date();
              now.setMinutes(now.getMinutes() + 5);
              document.cookie = `userID=${obj.id}; Path=/; expires=${now.toUTCString()}; `;
              document.cookie = `userName=${encodeURI(obj.last_name + obj.first_name)};  Path=/; expires=${now.toUTCString()} `;
              history.back();
            }
            console.log(info)

        } catch (error) {
            console.error(error);
            this.flag = true
        }
    },
    removeInfo () {
      document.cookie = `userID=; Path=/; expires=Fri, 31-Dec-1999 23:59:59 GMT;`;
      document.cookie = `userName=; Path=/; expires=Fri, 31-Dec-1999 23:59:59 GMT;`;
    }
  }

});
