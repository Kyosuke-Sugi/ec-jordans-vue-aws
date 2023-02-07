<template>
    <header class="w-full bg-[#f2f3f7]">
    <div class="w-10/12 my-0 mx-auto py-3 flex justify-between items-center">
      <div class="w-[300px]">
        <RouterLink to="/" class="text-[#35325c] font-['Georgia'] font-bold text-3xl" >JORDANS</RouterLink>
      </div>
      <nav class="w-1/2">
        <ul class="flex justify-around">
          <li key="mypage" class="text-[#2c3047ba]">
            <RouterLink to="/cart" class="p-3">
              <span>カート</span>
            </RouterLink>
          </li>
          <li key="contact" class="text-[#2c3047ba]">
            <RouterLink to="/contact" class="p-3">
              <span>お問い合わせ</span>
            </RouterLink>
          </li>
          <li key="purchase" class="text-[#2c3047ba]">
            <RouterLink to="/purchase" class="p-3">
              <span>買取受付</span>
            </RouterLink>
          </li>
          <li key="signup" class="text-[#2c3047ba]">
            <RouterLink to="/signup" class="p-3">
              <span>会員登録</span>
            </RouterLink>
          </li>
          <li key="login" class="text-[#2c3047ba]">
            <button>ログイン</button>
          </li>
        </ul>
      </nav>
    </div>
    <img src="../assets/images/header.jpg" alt="ヘッダー画像">
  </header>
</template>
