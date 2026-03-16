# SMARTHealthCards-es

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

[SMART Health Cards](https://smarthealth.cards/) decoder in JavaScript (ES Module) that decodes and verifies COVID-19 vaccination certificates.

## Features
- Decode SMART Health Cards data from QR codes
- Verify the digital signature using the public key

## Requirements
None, this is a standalone library.

## Usage
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

## License
MIT License — see [LICENSE](LICENSE).