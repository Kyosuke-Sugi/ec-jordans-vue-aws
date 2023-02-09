<template>
    <form>
        <h1>買取受付フォーム</h1>
        <!-- 画像スペース -->
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
            <span>必須</span>メールアドレス
          </label>
          <input
            id="email"
            placeholder="sample@sample.co.jp"
          />
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
        <h2 >
          <span>
            買取希望商品情報を入力してください。
          </span>
        </h2>
        <hr />
        <div>
          <div>
            <h3>買取希望商品１</h3>
            <div>
              <label htmlFor="itemName">
                <span>必須</span>品名
              </label>
              <input
                type="text"
                placeholder="NIKE AIR JORDAN 1"
                id="itemName"
              />
            </div>
            <div>
              <label htmlFor="itemCode">
                <span>必須</span>品番
              </label>
              <input
                type="text"
                placeholder="555088-101"
                id="itemCode"
              />
            </div>
            <div>
              <label htmlFor="itemSize">
                <span>必須</span>サイズ（cm）
              </label>
              <input
                type="text"
                placeholder="28cm"
                id="itemSize"
              />
            </div>
            <div>
              <label htmlFor="itemColor">
                <span className="label-fit label-danger">必須</span>カラー
              </label>
              <input
                type="text"
                placeholder="白"
                id="itemColor"
              />
            </div>
            <div>
              <label htmlFor="itemPhoto">
                <span>必須</span>写真
              </label>
              <input
                accept="image/*"
                type="file"
                id="itemPhoto"
              />
              <!-- <div>
                {!!imageData && (
                  <>
                    <span className="subtitle-preview">*プレビュー</span>
                    <output className="preview">
                      <Image
                        src={imageData}
                        alt="画像プレビュー"
                        height={150}
                        width={150}
                      />
                    </output>
                  </>
                )}
              </div> -->
            </div>
            <div>
              <label htmlFor="itemNote">
                <span>任意</span>備考
              </label>
              <input
                type="text"
                placeholder="箱無し、傷あり"
                id="itemNote"
              />
            </div>
          </div>
          <div>
            <h3>買取希望商品２</h3>
            <div>
              <label htmlFor="itemNameB">
                <span>必須</span>品名
              </label>
              <input
                type="text"
                placeholder="NIKE AIR JORDAN 1"
                id="itemNameB"
              />
            </div>
            <div>
              <label htmlFor="itemCodeB">
                <span>必須</span>品番
              </label>
              <input
                type="text"
                placeholder="555088-101"
                id="itemCodeB"
              />
            </div>
            <div>
              <label htmlFor="itemSizeB">
                <span>必須</span>サイズ（cm）
              </label>
              <input
                type="text"
                placeholder="28cm"
                id="itemSizeB"
              />
            </div>
            <div>
              <label htmlFor="itemColorB">
                <span>必須</span>カラー
              </label>
              <input
                type="text"
                placeholder="白"
                id="itemColorB"
              />
            </div>
            <div>
              <label htmlFor="itemPhotoB">
                <span>必須</span>写真
              </label>
              <input
                type="file"
                id="itemPhotoB"
              />
            </div>
            <!-- <div>
              {!!imageDataB && (
                <>
                  <span className="subtitle-preview">*プレビュー</span>
                  <output className="preview">
                    <Image
                      src={imageDataB}
                      alt="画像プレビュー"
                      height={150}
                      width={150}
                    />
                  </output>
                </>
              )}
            </div> -->
            <div>
              <label htmlFor="itemNoteB">
                <span>任意</span>備考
              </label>
              <input
                type="text"
                placeholder="箱無し、傷あり"
                id="itemNoteB"
              />
            </div>
          </div>
        </div>

        <div>
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
              cols={120}
              rows={15}
              id="note"
              placeholder="買取情報を入力してください"
            />
          </div>
        </div>
        <div>
          <button type="submit">
            入力内容を確認
          </button>
        </div>
    </form>
</template>
