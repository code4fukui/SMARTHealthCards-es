# SMARTHealthCards-es

[SMART Health Cards](https://smarthealth.cards/)のデコーダー（JavaScript ES Module）です。新型コロナワクチン接種証明書を復号化・検証するツールです。

## 機能
- SMART Health Cardsの復号化
- 公開鍵による署名の検証

## 使い方
```js
import { SMARTHealthCards } from "https://code4fukui.github.io/SMARTHealthCards-es/SMARTHealthCards.js";

const shc = "shc:/567..."; // QRコードから値を取得
const dec = SMARTHealthCards.decode(shc);
console.log(dec);
const res = await SMARTHealthCards.verify(dec);
console.log("verify by the pubkey from web", res);

// 公開鍵(JWKS)をファイルから読み込む
const jwks = JSON.parse(await Deno.readTextFile("./vc_vrs_digital_go_jp_issuer_well-known_jwks.json"));
const res2 = await SMARTHealthCards.verify(dec, jwks);
console.log("verify by fetched pubkey", res2);

const data = await SMARTHealthCards.toStringEntry(dec);
console.log(data);
```

## ライセンス
MIT License