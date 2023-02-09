<template>
    <header class="w-full">
    <div class="bg-[#f2f3f7] w-full my-0 mx-auto py-3 flex justify-between items-center fixed top-0 z-50">
      <div class="w-[300px]">
        <RouterLink to="/" class="text-[#35325c] font-['Georgia'] font-bold text-3xl ml-3" >JORDANS</RouterLink>
      </div>
      <nav class="w-1/2">
        <ul class="flex justify-around text-center">
          <li key="mypage" class="text-[#2c3047ba] w-full">
            <RouterLink to="/cart" class="p-5">
              <span>カート</span>
            </RouterLink>
          </li>
          <li key="contact" class="text-[#2c3047ba] w-full">
            <RouterLink to="/contact" class="p-5">
              <span>お問い合わせ</span>
            </RouterLink>
          </li>
          <li key="purchase" class="text-[#2c3047ba] w-full">
            <RouterLink to="/purchase" class="p-5">
              <span>買取受付</span>
            </RouterLink>
          </li>
          <li key="signup" class="text-[#2c3047ba] w-full">
            <RouterLink to="/signup" class="p-5">
              <span>会員登録</span>
            </RouterLink>
          </li>
          <li key="login" class="text-[#2c3047ba] w-full">
            <RouterLink to="/login" class="p-5">
              <span>ログイン</span>
            </RouterLink>
          </li>
        </ul>
      </nav>
    </div>
    <img src="../assets/images/header.jpg" alt="ヘッダー画像" class="w-full">
  </header>
</template>
