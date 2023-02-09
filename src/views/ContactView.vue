<template>
    <div>
      <!-- <ContactConfirmation />
      <ContactForm /> -->
    </div>
    <div>
      <form>
        <h1>お問い合わせフォーム</h1>
        <h2>
          <span >お客様情報を入力してください。</span>
        </h2>
        <hr />
        <div>
          <label htmlFor="lastName">
            <span>必須</span>氏名
          </label>
          <input
            id="lastName"
            placeholder="山田"
          />
          <input
            id="firstName"
            placeholder="太郎"
          />
        </div>
        <div>
          <label htmlFor="kanaLastName">
            <span className="label-fit label-danger">必須</span>氏名（カナ）
          </label>

          <input
            id="kanaLastName"
            placeholder="ヤマダ"
          />
          <input
            id="kanaFirstName"
            placeholder="タロウ"
          />
        </div>
        <div>
          <div>
            <label htmlFor="phoneNumber">
              <span className="label-fit label-danger">必須</span>電話番号
            </label>

            <input
              id="phone"
              placeholder="0312345678"
            />
          </div>
          <div>
            <span className="notice">*ハイフンなしで入力してください。</span>
          </div>
        </div>
        <div>
          <label htmlFor="email">
            <span className="label-fit label-danger">必須</span>メールアドレス
          </label>
          <input
            id="email"
            placeholder="sample@sample.co.jp"
          />
        </div>

        <div>
          <h2>
            <span>
              お問い合わせ内容を入力してください。
            </span>
          </h2>
          <hr />
          <textarea
            cols={80}
            rows={5}
            id="content"
            placeholder="お問い合わせ内容を入力してください"
          />
        </div>
        <button type="submit">
          入力内容を確認
        </button>
      </form>
    </div>
</template>
