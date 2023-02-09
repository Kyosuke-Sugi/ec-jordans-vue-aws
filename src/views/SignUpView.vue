<template>
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
          <div>
            <span className="notice">
              *メールアドレスはログインIDになります。
            </span>
          </div>
        </div>
        <div>
          <label htmlFor="postCode">
            <span>必須</span>郵便番号
          </label>
          <input
            id="postCode"
            type="text"
            placeholder="1600022"
          >
          <input
            type="button"
            value="住所を自動入力"
          />
        </div>
        <div>
          <label htmlFor="prefecture">
            <span>必須</span>都道府県
          </label>
          <input
            type="text"
            placeholder="東京都"
            id="prefecture"
          />
        </div>
        <div>
          <label htmlFor="city">
            <span>必須</span>市区町村
          </label>
          <input
            type="text"
            placeholder="新宿区新宿"
            id="city"
          >
        </div>
        <div>
          <label htmlFor="address">
            <span className="label-fit label-danger">必須</span>番地
          </label>
          <input
            type="text"
            placeholder="4-3-25"
            id="address"
          />
        </div>
        <div>
          <label htmlFor="building">
            <span>任意</span>建物名
          </label>
          <input
            type="text"
            placeholder="TOKYU REIT新宿ビル8F"
            id="building"
          />
          <br />
        </div>
        <button type="submit">
          入力内容を確認
        </button>
    </form>
</template>
