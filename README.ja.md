# SMARTHealthCards-es

新型コロナウイルスワクチン接種証明書をデコードおよび検証する、JavaScript (ES Module) 製の [SMART Health Cards](https://smarthealth.cards/) デコーダーです。

## 機能
- QRコードからSMART Health Cardsのデータをデコード
- 公開鍵を使用してデジタル署名を検証

## 要件
なし。スタンドアロンのライブラリです。

## 使い方
```js
import { SMARTHealthCards } from "https://code4fukui.github.io/SMARTHealthCards-es/SMARTHealthCards.js";

const shc = "shc:/567..."; // set data from QRCode
const dec = SMARTHealthCards.decode(shc);
console.log(dec);
const res = await SMARTHealthCards.verify(dec);
console.log("verify by the pubkey from web", res);

// Fetch public key from a local file
const jwks = JSON.parse(await Deno.readTextFile("./vc_vrs_digital_go_jp_issuer_well-known_jwks.json"));
const res2 = await SMARTHealthCards.verify(dec, jwks);
console.log("verify by fetched pubkey", res2);

const data = await SMARTHealthCards.toStringEntry(dec);
console.log(data);
```

## ライセンス
MIT License — 詳細は [LICENSE](LICENSE) を参照してください。
