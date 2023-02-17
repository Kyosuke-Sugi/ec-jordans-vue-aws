<script lang="ts" setup>
import { supabase } from '@/supabase';
import type { Users } from '@/types/types';
import { useCookie } from '@/useCookie';
import { onMounted, ref, type Ref } from 'vue';

const userID: Ref<string | undefined> = ref("");
const userInfo: Ref<Users> = ref({
    id: NaN,
    first_name: "",
    last_name: "",
    kana_first_name: "",
    kana_last_name: "",
    email: "",
    password: "",
    zip_code: "",
    prefecture: "",
    city: "",
    address: "",
    building: "",
    phone: ""
});

onMounted(async () => {
    userID.value = useCookie();
    try {
            const checkData = await supabase
              .from("users")
              .select("*")
              .eq("id", userID.value)
        
            if (!checkData.data) return;
            const obj = await checkData.data[0];
            
            if (obj === undefined) {
              throw Error;
            } else {
              userInfo.value = obj              
            }

    } catch (error) {
        console.error(error);
    }

    console.log(userInfo.value);
});


</script>

<template>
    <div class="my-10">
      <h2 class="text-lg mb-6 font-bold">お届け先情報</h2>
      <table>
        <tbody>
          <tr>
            <th class="w-1/3 py-5 bg-blue-50 border border-blue-100">
              氏名 
            </th>
            <td class="p-5 bg-slate-50 border border-slate-100">
                <span>{{ userInfo.last_name }}</span><span>{{ userInfo.first_name }}</span>
            </td>
          </tr>
          <tr>
            <th class="w-1/3 py-5 bg-blue-50 border border-blue-100">郵便番号</th>
            <td class="p-5 bg-slate-50 border border-slate-100">{{ userInfo.zip_code }}</td>
          </tr>
          <tr>
            <th class="w-1/3 py-5 bg-blue-50 border border-blue-100">お届け先住所</th>
            <td class="p-5 bg-slate-50 border border-slate-100">{{ userInfo.prefecture }}{{ userInfo.city }}{{ userInfo.address }}{{ userInfo.building }}</td>
          </tr>
          <tr>
            <th class="w-1/3 py-5 bg-blue-50 border border-blue-100">電話番号</th>
            <td class="p-5 bg-slate-50 border border-slate-100">{{ userInfo.phone }}</td>
          </tr>
          <tr>
            <th class="w-1/3 py-5 bg-blue-50 border border-blue-100">メールアドレス</th>
            <td class="p-5 bg-slate-50 border border-slate-100">{{ userInfo.email }}</td>
          </tr>
        </tbody>
      </table>
      <p class="my-5">※<span class="font-semibold">お届け先住所の変更</span>を希望の方は以下の<a class="text-blue-600 font-semibold" href="#changeAddress">備考欄</a>にご記入ください。</p>
    </div>
</template>
