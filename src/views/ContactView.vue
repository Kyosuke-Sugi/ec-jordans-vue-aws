<script lang="ts" setup>
import { useField, useForm } from "vee-validate";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { object, string, number } from "yup";

const router = useRouter();
const confirmFlag = ref(false);

const changeFlag = () => {
  confirmFlag.value = !confirmFlag.value
}
const submitContent = () => {
  alert("送信しました");
  router.push("/contact");
}

const schema = object({
  lastName: string().required('*苗字は必須項目です'),
  firstName: string().required('*名前は必須項目です'),
  lastKana: string().required('*苗字は必須項目です'),
  firstKana: string().required('*名前は必須項目です'),
  phoneNumber: number().nullable()
    .transform((value, originalValue) =>
      String(originalValue).trim() === '' ? null : value
  ).typeError('*数値を入力してください').required('*必須項目です'),
  email: string().required('*必須項目です').email('*メールアドレスの形式ではありません'),
  content: string().required('*必須項目です'),
});

const { errors, meta } = useForm({
  validationSchema: schema,
});

const { value: lastName } = useField('lastName');
const { value: firstName } = useField('firstName');
const { value: lastKana } = useField('lastKana');
const { value: firstKana } = useField('firstKana');
const { value: phoneNumber } = useField('phoneNumber');
const { value: email, handleChange } = useField('email');
const { value: content }: any = useField('content');
</script>

<template>
    <div v-if="confirmFlag">
      <form>
        <h1 class="w-3/4 mx-auto my-16 text-3xl font-bold text-slate-700">お問い合わせフォーム</h1>
        <h2 class="w-3/4 mx-auto text-lg mb-6">
          記入事項に間違えがないか確認し、送信してください
        </h2>
        <table class="w-3/4 mx-auto">
          <tbody>
            <tr>
              <th class="w-1/3 py-5 bg-blue-50 border border-blue-100">
                氏名 
              </th>
              <td class="p-5 bg-slate-50 border border-slate-100">
                <span>{{ lastName }}</span><span>{{ firstName }}</span>
              </td>
            </tr>
            <tr>
              <th class="w-1/3 py-5 bg-blue-50 border border-blue-100">氏名(カナ)</th>
              <td class="p-5 bg-slate-50 border border-slate-100"><span>{{ lastKana }}</span><span>{{ firstKana }}</span></td>
            </tr>
            <tr>
              <th class="w-1/3 py-5 bg-blue-50 border border-blue-100">電話番号</th>
              <td class="p-5 bg-slate-50 border border-slate-100">{{ phoneNumber }}</td>
            </tr>
            <tr>
              <th class="w-1/3 py-5 bg-blue-50 border border-blue-100">メールアドレス</th>
              <td class="p-5 bg-slate-50 border border-slate-100">{{ email }}</td>
            </tr>
            <tr>
              <th class="w-1/3 py-5 bg-blue-50 border border-blue-100">お問い合わせ内容</th>
              <td class="p-5 bg-slate-50 border border-slate-100">{{ content }}</td>
            </tr>
          </tbody>
        </table>
        <div class="w-3/4 mx-auto my-10">
          <div class="text-center">
            <button 
            class="mx-3 my-6 w-48 h-10 p-2 bg-gray-400 rounded-xl text-white shadow disabled:opacity-60"
              @click="changeFlag"
            >
              入力内容を修正する
            </button>
            <button
              class="my-6 w-36 h-10 p-2 bg-[#35325c] rounded-xl text-white shadow disabled:opacity-60" 
             @click="submitContent"
            >
              送信する
            </button>
          </div>
        </div>
      </form>
    </div>
    <div v-else>
      <form>
        <h1 class="w-3/4 mx-auto my-16 text-3xl font-bold text-slate-700">お問い合わせフォーム</h1>
        <h2 class="w-3/4 mx-auto text-lg mb-6">
          お客様情報を入力してください。
        </h2>
        <hr />
        <div class="w-3/4 mx-auto my-10">
          <label htmlFor="lastName" class=" mr-14">
            <span class=" bg-red-700 text-white p-1 rounded-lg mr-3">必須</span>氏名
          </label>
          <input
            id="lastName"
            placeholder="山田"
            v-model="lastName"
            class=" bg-slate-100 mr-3 py-2 px-3"
          />
          <input
            id="firstName"
            placeholder="太郎"
            v-model="firstName"
            class=" bg-slate-100 mr-3 py-2 px-3"
          />
          <p class="text-red-600">{{ errors.lastName }}</p>
          <p class="text-red-600">{{ errors.firstName }}</p>
        </div>
        <div class="w-3/4 mx-auto my-10">
          <label htmlFor="kanaLastName">
            <span class="bg-red-700 text-white p-1 rounded-lg mr-3">必須</span>氏名（カナ）
          </label>
          <input
            id="kanaLastName"
            placeholder="ヤマダ"
            v-model="lastKana"
            class=" bg-slate-100 mr-3 py-2 px-3"
          />
          <input
            id="kanaFirstName"
            placeholder="タロウ"
            v-model="firstKana"
            class=" bg-slate-100 mr-3 py-2 px-3"
          />
          <p class="text-red-600">{{ errors.lastKana }}</p>
          <p class="text-red-600">{{ errors.firstKana }}</p>
        </div>
        <div class="w-3/4 mx-auto my-10">
          <div>
            <label htmlFor="phoneNumber" class="mr-6">
              <span class="bg-red-700 text-white p-1 rounded-lg mr-3">必須</span>電話番号
            </label>
            <input
              id="phone"
              placeholder="0312345678"
              v-model="phoneNumber"
              class=" bg-slate-100 mr-3 py-2 px-3"
            />
            <p class="text-red-600">{{ errors.phoneNumber }}</p>
          </div>
          <div>
            <span class="text-red-600">*ハイフンなしで入力してください。</span>
          </div>
        </div>
        <div class="w-3/4 mx-auto my-10">
          <label htmlFor="email" class="mr-3">
            <span class="bg-red-700 text-white p-1 rounded-lg mr-3">必須</span>メールアドレス
          </label>
          <input
            id="email"
            placeholder="sample@sample.co.jp"
            :value="email"
            @blur="handleChange"
            class=" bg-slate-100 mr-3 py-2 px-3"
          />
          <p class="text-red-600">{{ errors.email }}</p>
        </div>

        <div class="w-3/4 mx-auto my-10">
          <h2>
            <span class="bg-red-700 text-white p-1 rounded-lg mr-3">必須</span>
              お問い合わせ内容を入力してください。
          </h2>
          <hr />
          <textarea
            class="my-3 bg-slate-100 mr-3 w-96 h-48 ml-14"
            v-model="content"
            id="content"
            placeholder="お問い合わせ内容を入力してください"
          >
          </textarea>
          <p class="text-red-600">{{ errors.content }}</p>
        </div>
        <div class="w-3/4 mx-auto my-10">
          <div class="text-center">
            <button
              class="my-6 w-36 h-10 p-2 bg-[#35325c] rounded-xl text-white shadow disabled:opacity-60" 
              type="submit" 
              :disabled="!meta.valid"
              @click="changeFlag"
              >
              入力内容を確認
            </button>
          </div>
        </div>
      </form>
    </div>
</template>
