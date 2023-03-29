//import { Base64 } from "https://code4fukui.github.io/Base64/Base64.js";
import { Base64URL as Base64 } from "https://code4fukui.github.io/Base64URL/Base64URL.js";

/*
RFC 3447 specifies RSASSA-PKCS1-v1_5.
RFC 3447 specifies RSA-PSS.
FIPS-186 specifies ECDSA.
FIPS 198-1 specifies HMAC.
*/

const derEncodedPublicKey = Base64.decode(
  "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE5/J6xKyJxzOJ85om+jUJUFHMqnpruqXnKx5jKRojB3E1gC29g/kAc6xHunY05IW+gn2oeAdjggnH7a4WQ8/Afg=="
);
console.log(derEncodedPublicKey);

const data = new Uint8Array([
  73, 150, 13, 229, 136, 14, 140, 104, 116, 52, 23, 15, 100, 118, 96, 91, 143,
  228, 174, 185, 162, 134, 50, 199, 153, 92, 243, 186, 131, 29, 151, 99, 5, 0,
  0, 0, 0, 182, 173, 217, 158, 122, 216, 45, 140, 214, 44, 204, 209, 62, 118,
  45, 12, 238, 10, 91, 88, 80, 235, 131, 5, 70, 171, 245, 252, 71, 13, 207, 235,
]);

const sig = new Uint8Array([
  48, 68, 2, 32, 58, 26, 13, 251, 116, 195, 219, 77, 90, 1, 64, 38, 54, 249, 56,
  87, 235, 24, 78, 26, 13, 88, 74, 224, 159, 58, 159, 133, 111, 98, 69, 214, 2,
  32, 87, 1, 32, 191, 170, 10, 33, 204, 86, 124, 73, 21, 153, 4, 58, 182, 248,
  175, 144, 80, 146, 173, 247, 205, 36, 51, 59, 221, 212, 133, 107, 118,
]);

function nodeVerify() {
  const nodeKey = crypto.createPublicKey({
    format: "der",
    key: derEncodedPublicKey,
    type: "spki",
  });
  const v = crypto.createVerify("SHA256").update(data);
  return v.verify(nodeKey, sig);
}

async function webVerify() {
  const webkey = await webcrypto.subtle.importKey(
    "spki",
    derEncodedPublicKey,
    {
      name: "ECDSA",
      namedCurve: "P-256",
    },
    false,
    ["verify"]
  );
  console.log(webkey);
  return webcrypto.subtle.verify(
    {
      name: "ECDSA",
      hash: "SHA-256",
    },
    webkey,
    sig,
    data
  );
}

const webcrypto = crypto;
//console.log("Node verify result:", nodeVerify());
console.log("Web verify result:", await webVerify());
