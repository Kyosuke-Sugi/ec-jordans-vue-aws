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
  postCode: number().nullable()
    .transform((value, originalValue) =>
      String(originalValue).trim() === '' ? null : value
  ).typeError('*数値を入力してください').required('*必須項目です'),
  prefecture: string().required('*必須項目です'),
  city: string().required('*必須項目です'),
  address: string().required('*必須項目です'),
  building: string().required('*必須項目です'),
  itemName: string(),
  itemCode: string(),
  size: string(),
  color: string(),
  message: string()
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
const { value: postCode }: any = useField('postCode');
const { value: prefecture } = useField('prefecture');
const { value: city } = useField('city');
const { value: address } = useField('address');
const { value: building } = useField('building');
const { value: itemName } = useField('itemName');
const { value: itemCode } = useField('itemCode');
const { value: size } = useField('size');
const { value: color } = useField('color');
const { value: message } = useField('message');
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
              <th class="w-1/3 py-5 bg-blue-50 border border-blue-100">品名</th>
              <td class="p-5 bg-slate-50 border border-slate-100">{{ itemName }}</td>
            </tr>
            <tr>
              <th class="w-1/3 py-5 bg-blue-50 border border-blue-100">品番</th>
              <td class="p-5 bg-slate-50 border border-slate-100">{{ itemCode }}</td>
            </tr>
            <tr>
              <th class="w-1/3 py-5 bg-blue-50 border border-blue-100">サイズ</th>
              <td class="p-5 bg-slate-50 border border-slate-100">{{ size }}</td>
            </tr>
            <tr>
              <th class="w-1/3 py-5 bg-blue-50 border border-blue-100">カラー</th>
              <td class="p-5 bg-slate-50 border border-slate-100">{{ color }}</td>
            </tr>
            <tr>
              <th class="w-1/3 py-5 bg-blue-50 border border-blue-100">備考</th>
              <td class="p-5 bg-slate-50 border border-slate-100">{{ message }}</td>
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
        <h1 class="w-3/4 mx-auto my-16 text-3xl font-bold text-slate-700">買取受付フォーム</h1>
          <div class=" w-1/2 mx-auto mb-8">
            <img class="w-full" src="/kaitori.png" alt="買取図">
          </div>
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
              <span class="bg-red-700 text-white p-1 rounded-lg mr-3">必須</span>建物名
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
          <h2 class="w-3/4 mx-auto text-lg mb-6">
              買取希望商品情報を入力してください。
          </h2>
          <hr />
          <div class="w-3/4 mx-auto flex justify-start">
            <div>
              <h3 class="text-lg my-5">買取希望商品１</h3>
              <div class="my-3">
                <label htmlFor="itemName" class="mr-3">
                  品名
                </label>
                <input
                  id="itemName"
                  placeholder="AIR JORDAN 1"
                  class=" bg-slate-100 mr-3 py-2 px-3"
                  v-model="itemName"
                />
              </div>
              <div class="my-3">
                <label htmlFor="itemCode" class="mr-3">
                  品番
                </label>
                <input
                  id="itemCode"
                  placeholder="555000-1"
                  class=" bg-slate-100 mr-3 py-2 px-3"
                  v-model="itemCode"
                />
              </div>
              <div class="my-3">
                <label htmlFor="itemSize" class="mr-3">
                  サイズ (cm)
                </label>
                <input
                  id="itemSize"
                  placeholder="28cm"
                  class=" bg-slate-100 mr-3 py-2 px-3"
                  v-model="size"
                />
              </div>
              <div class="my-3">
                <label htmlFor="itemColor" class="mr-3">
                  カラー
                </label>
                <input
                  id="itemColor"
                  placeholder="白"
                  class=" bg-slate-100 mr-3 py-2 px-3"
                  v-model="color"
                />
              </div>
              <div class="my-3">
                <label htmlFor="itemPhoto" class="mr-3">
                  写真
                </label>
                <input
                  type="file"
                  id="itemPhoto"
                  placeholder="555000-1"
                  class="mr-3 py-2 px-3"
                />
              </div>
              <div class="my-3">
                <label htmlFor="message" class="mr-3">
                  備考
                </label>
                <input
                  id="message"
                  placeholder="箱なし、傷あり"
                  class=" bg-slate-100 mr-3 py-2 px-3"
                  v-model="message"
                />
              </div>
            </div>
            <div>
              <h3 class="text-lg my-5">買取希望商品２</h3>
              <div class="my-3">
                <label htmlFor="itemName" class="mr-3">
                  品名
                </label>
                <input
                  id="itemName"
                  placeholder="AIR JORDAN 1"
                  class=" bg-slate-100 mr-3 py-2 px-3"
                />
              </div>
              <div class="my-3">
                <label htmlFor="itemCode" class="mr-3">
                  品番
                </label>
                <input
                  id="itemCode"
                  placeholder="555000-1"
                  class=" bg-slate-100 mr-3 py-2 px-3"
                />
              </div>
              <div class="my-3">
                <label htmlFor="itemSize" class="mr-3">
                  サイズ (cm)
                </label>
                <input
                  id="itemSize"
                  placeholder="28cm"
                  class=" bg-slate-100 mr-3 py-2 px-3"
                />
              </div>
              <div class="my-3">
                <label htmlFor="itemColor" class="mr-3">
                  カラー
                </label>
                <input
                  id="itemColor"
                  placeholder="白"
                  class=" bg-slate-100 mr-3 py-2 px-3"
                />
              </div>
              <div class="my-3">
                <label htmlFor="itemPhoto" class="mr-3">
                  写真
                </label>
                <input
                  type="file"
                  id="itemPhoto"
                  placeholder="555000-1"
                  class="mr-3 py-2 px-3"
                />
              </div>
              <div class="my-3">
                <label htmlFor="message" class="mr-3">
                  備考
                </label>
                <input
                  id="message"
                  placeholder="箱なし、傷あり"
                  class=" bg-slate-100 mr-3 py-2 px-3"
                />
              </div>
            </div>
          </div>
  
          <div class="w-3/4 mx-auto my-6">
            <p>
              さらに買取希望の方は下記の備考欄に入力をお願い致します。
              <br /> 下記をコピーしてお使いください。
              <br />
              ----------------------------
              <br /> 品名:
              <br /> 品番:
              <br /> サイズ:
              <br /> カラーetc:
              <br /> 備考:
            </p>
            <div>
              <label htmlFor="note">
                <span>任意</span>備考
              </label>
              <br />
              <textarea
                class="w-96 h-52 bg-slate-100 mr-3 py-2 px-3"
                id="note"
                placeholder="買取情報を入力してください"
              ></textarea>
            </div>
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
