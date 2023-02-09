<script lang="ts" setup>
import { ref } from 'vue';
import { useLoginStore } from "@/stores/user";
import { storeToRefs } from 'pinia';

const store = useLoginStore()
const userID = ref("");
const password = ref("");
const { flag } = storeToRefs(store);

const loginCheck = () => {
    const info = {
        userID: userID.value,
        password: password.value
    }
    store.addInfo(info);
    console.log(info)
}

</script>

<template>
    <div>
        <div>
          <p>メールアドレス</p>
          <input
            placeholder="sample@example.com"
            type="text"
            name="id"
            v-model="userID"
          />
          <p>パスワード</p>
          <input
            type="password"
            placeholder="Password"
            name="pw"
            v-model="password"
          />
          <br />
          <span>
            <input
              type="button"
              value="ログイン"
              @click="loginCheck"
            />
          </span>
        </div>
        <p v-if="flag">ログインできませんでした</p>
      </div>
</template>
