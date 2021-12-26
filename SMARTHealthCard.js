import { rawinflate } from "https://taisukef.github.io/zlib.js/es/rawinflate.js";
import { Base64URL } from "https://code4fukui.github.io/Base64URL/Base64URL.js";

const decode = (code) => {
  if (!code.startsWith("shc:/")) {
    throw new Error("is not shc");
  }
  const list = [];
  for (let i = 5; i < code.length; i += 2) {
    const c = String.fromCharCode(parseInt(code.substring(i, i + 2)) + 45);
    list.push(c);
  }
  const sss = list.join("").split(".");
  const [header0, payload0, signature] = sss.map(d => Base64URL.decode(d));
  const payload = JSON.parse(new TextDecoder().decode(rawinflate(payload0)));
  const header = JSON.parse(new TextDecoder().decode(header0));
  const data = new TextEncoder().encode(sss[0] + "." + sss[1]);
  return { header, payload, signature, data };
};

const fetchJWKS = async (iss) => {
  const jwksUrl = iss + "/.well-known/jwks.json";
  const res = await fetch(jwksUrl);
  const jwks = await res.json();
  return jwks;
};

const getJWK = async (iss, jwks) => {
  const keys = jwks || await fetchJWKS(iss);
  const key = keys.keys[0]
  //console.log(key);
  key.use = undefined; // cause: DataError: 'use' property of JsonWebKey must be 'undefined'
  const pubkey = await crypto.subtle.importKey("jwk", key, {
    name: "ECDSA", namedCurve: "P-256"
  }, true, ["verify"]);
  //console.log(pubkey);
  return pubkey;
};

const verify = async (dec, jwks) => {
  const iss = dec.payload.iss;
  //console.log(iss);
  const pubkey = await getJWK(iss, jwks);
  const algorithm = { name: "ECDSA", hash: { name: "SHA-256"} };
  const result = await crypto.subtle.verify(algorithm, pubkey, dec.signature, dec.data);
  return result;
};

const toStringEntry = (dec) => {
  const entries = dec.payload.vc.credentialSubject.fhirBundle.entry;
  const data = [];
  for (const entry of entries) {
    const r = entry.resource;
    switch (r.resourceType) {
      case "Patient":
        data.push(r.name[0].family + " " + r.name[0].given + " (" + r.birthDate + ")");
        break;
      case "Immunization":
        if (r.status == "completed") {
          data.push("ワクチン接種日 " + r.occurrenceDateTime);
        }
        break;
    }
  }
  return data.join("\n");
};

const SMARTHealthCard = {
  decode,
  verify, // async
  toStringEntry, // ja
};

export { SMARTHealthCard };
