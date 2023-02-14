<script lang="ts" setup>
import { useField, useForm } from "vee-validate";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { object, string, number, ref as Ref } from "yup";

const router = useRouter();
const confirmFlag = ref(false);

const changeFlag = () => {
  confirmFlag.value = !confirmFlag.value
}
const submitContent = () => {

  const info = {
    last_name: lastName.value,
    first_name: firstName.value,
    kana_last_name: lastKana.value,
    kana_first_name: firstKana.value,
    phone: phoneNumber.value,
    email: email.value,
    zip_code: postCode.value,
    prefecture: prefecture.value,
    city: city.value,
    address: address.value,
    building: building.value,
    password: password.value,
  }
  console.log(info)
  router.push("/");
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
  postCode: number().nullable()
    .transform((value, originalValue) =>
      String(originalValue).trim() === '' ? null : value
  ).typeError('*数値を入力してください').required('*必須項目です'),
  prefecture: string().required('*必須項目です'),
  city: string().required('*必須項目です'),
  address: string().required('*必須項目です'),
  building: string(),
  password: string().required().matches(
    /(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-z0-9]{8,}$/,
  ),
  passwordConfirm: string().required('*必須項目です').oneOf([Ref('password')], 'パスワードが一致していません')
});

const { errors, meta } = useForm({
  validationSchema: schema,
});

const { value: lastName } = useField('lastName');
const { value: firstName } = useField('firstName');
const { value: lastKana } = useField('lastKana');
const { value: firstKana } = useField('firstKana');
const { value: phoneNumber } = useField('phoneNumber');
const { value: email, handleChange: emailCheck } = useField('email');
const { value: postCode }: any = useField('postCode');
const { value: prefecture } = useField('prefecture');
const { value: city } = useField('city');
const { value: address } = useField('address');
const { value: building } = useField('building');
const { value: password } = useField('password');
const { value: passwordConfirm, handleChange: passwordCheck } = useField('passwordConfirm');

const citySuggest = async () => {
    const res = await fetch(
      `https://api.zipaddress.net/?zipcode=${postCode.value}`,
      {
        mode: "cors",
      }
    );
    const result = await res.json();

    //存在しない郵便番号の場合、アラートを返す
    if (result.code === 404 || result.code === 400) {
      alert("存在しない郵便番号です");
      return;
    }

    prefecture.value = result.data.pref;
    city.value = result.data.address;
  };

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
              <th class="w-1/3 py-5 bg-blue-50 border border-blue-100">郵便番号</th>
              <td class="p-5 bg-slate-50 border border-slate-100">{{ postCode }}</td>
            </tr>
            <tr>
              <th class="w-1/3 py-5 bg-blue-50 border border-blue-100">住所</th>
              <td class="p-5 bg-slate-50 border border-slate-100">{{ prefecture }}{{ city }}{{ address }}{{ building }}</td>
            </tr>
            <tr>
              <th class="w-1/3 py-5 bg-blue-50 border border-blue-100">パスワード</th>
              <td class="p-5 bg-slate-50 border border-slate-100">{{ password }}</td>
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
        <h1 class="w-3/4 mx-auto my-16 text-3xl font-bold text-slate-700">会員登録</h1>
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
                @blur="emailCheck"
                class=" bg-slate-100 mr-3 py-2 px-3"
              />
              <p class="text-red-600">{{ errors.email }}</p>
            </div>
            <div class="w-3/4 mx-auto my-10">
              <label htmlFor="postCode" class="mr-3">
                <span class="bg-red-700 text-white p-1 rounded-lg mr-3">必須</span>郵便番号
              </label>
              <input
                id="postCode"
                placeholder="1000000"
                class=" bg-slate-100 mr-3 py-2 px-3"
                v-model="postCode"
              />
              <input
                type="button"
                value="住所を自動入力"
                @click="citySuggest"
                class=" cursor-pointer"
              />
              <p class="text-red-600">{{ errors.postCode }}</p>
            </div>
            <div class="w-3/4 mx-auto my-10">
              <label htmlFor="prefecture" class="mr-3">
                <span class="bg-red-700 text-white p-1 rounded-lg mr-3">必須</span>都道府県
              </label>
              <input
                id="prefecture"
                placeholder="東京都"
                class=" bg-slate-100 mr-3 py-2 px-3"
                v-model="prefecture"
              />
              <p class="text-red-600">{{ errors.prefecture }}</p>
            </div>
            <div class="w-3/4 mx-auto my-10">
              <label htmlFor="city" class="mr-3">
                <span class="bg-red-700 text-white p-1 rounded-lg mr-3">必須</span>市区町村
              </label>
              <input
                id="city"
                placeholder="新宿区新宿"
                class=" bg-slate-100 mr-3 py-2 px-3"
                v-model="city"
              />
              <p class="text-red-600">{{ errors.city }}</p>
            </div>
            <div class="w-3/4 mx-auto my-10">
              <label htmlFor="address" class="mr-3">
                <span class="bg-red-700 text-white p-1 rounded-lg mr-3">必須</span>番地
              </label>
              <input
                id="address"
                placeholder="4-3-25"
                class=" bg-slate-100 mr-3 py-2 px-3"
                v-model="address"
              />
              <p class="text-red-600">{{ errors.address }}</p>
            </div>
            <div class="w-3/4 mx-auto my-10">
              <label htmlFor="building" class="mr-3">
                <span class="mx-7"></span>建物名
              </label>
              <input
                id="building"
                placeholder="TOKYU REIT 新宿ビル8F"
                class=" bg-slate-100 mr-3 py-2 px-3"
                v-model="building"
              />
              <p class="text-red-600">{{ errors.building }}</p>
              <br />
            </div>
            <div class="w-3/4 mx-auto my-10">
              <div class="flex justify-start items-center">
                <label htmlFor="password" class="mr-3">
                  <span class="bg-red-700 text-white p-1 rounded-lg mr-3">必須</span>パスワード
                </label>
                <input
                  type="password"
                  id="password"
                  class=" bg-slate-100 mr-3 py-2 px-3"
                  v-model="password"
                />
                <div class="w-5">
                  <img v-if="password && !errors.password" src="/mark/ok_mark.png" alt="OK" class="w-full">
                  <img v-else-if="password && errors.password" src="/mark/ng_mark.png" alt="NG" class="w-full">
                </div>
              </div>
              <p>*パスワードは8文字以上24文字以下にしてください。</p>
              <p>*パスワードには大文字、小文字、数字を少なくとも１つ設定してください。</p>
            </div>
            <div class="w-3/4 mx-auto my-10">
              <div class="flex justify-start items-center">
                <label htmlFor="password" class="mr-3">
                  <span class="bg-red-700 text-white p-1 rounded-lg mr-3">必須</span>パスワード(確認用)
                </label>
                <input
                  type="password"
                  id="password"
                  @blur="passwordCheck"
                  class=" bg-slate-100 mr-3 py-2 px-3"
                  :value="passwordConfirm"
                />
                <div class="w-5">
                  <img v-if="passwordConfirm && !errors.passwordConfirm" src="/mark/ok_mark.png" alt="OK" class="w-full">
                  <img v-else-if="passwordConfirm && errors.passwordConfirm" src="/mark/ng_mark.png" alt="NG" class="w-full">
                </div>
              </div>
              <p class="text-red-600">{{ errors.passwordConfirm }}</p>
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
