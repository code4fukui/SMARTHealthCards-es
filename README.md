# SMARTHealthCard-es

SMART Health Card decoder in JavaScript (ES Module) / 新型コロナワクチン接種証明書をデコード・検証します
## how to use

```js
import { SMARTHealthCard } from "https://code4fukui.github.io/SMARTHealthCard/SMARTHealthCard.js";

const shc = "shc:/567..."; // set data from QRCode
const dec = SMARTHealthCard.decode(shc);
console.log(dec);
const res = await SMARTHealthCard.verify(dec);
console.log("verify by the pubkey from web", res);

//const jwks = await (await fetch("./vc_vrs_digital_go_jp_issuer_well-known_jwks.json")).json();
const jwks = JSON.parse(await Deno.readTextFile("./vc_vrs_digital_go_jp_issuer_well-known_jwks.json"));
const res2 = await SMARTHealthCard.verify(dec, jwks);
console.log("verify by fetched pubkey", res2);

const data = await SMARTHealthCard.toStringEntry(dec);
console.log(data);
```

## sample app

- [高速ワクチン接種証明書チェッカー - SMARTHealthCard decoder](https://code4fukui.github.io/vcchecker/)
