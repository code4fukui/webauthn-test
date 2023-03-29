import { Base64URL } from "https://code4fukui.github.io/Base64URL/Base64URL.js";
import { parseAuthData } from "./static/parseAuthData.js";
import { CBOR } from "https://js.sabae.cc/CBOR.js";

const s = `dlBEjH_0DejiNkZgTVt-pEFGAai_QG3G-mhDlLcIw65FAAAAAK3OAAI1vMYKZIsLJfHwVQMAIDZJQ_Ui7JwyGnkeYthGP12GUZs8HmdXcmoYQqRvlGvSpQECAyYgASFYIMUKB7fWe0cG737mbGmr8f0_NCvaOAT8fCrYHlI__3xJIlggyt7z-9xHGyhQNrFoAh0p__4CYjUL5AMlXk-nxbaU97s`;
const authData = Base64URL.decode(s);
//console.log(authData, authData.length, authData.buffer.byteLength);
const auth = parseAuthData(authData);
console.log(auth);
/*
pubKeyCredParams
  {type: 'public-key', alg: -7} // ES256
  {type: 'public-key', alg: -257} // RS256

  // cose.ts
export enum COSEKEYS {
  kty = 1,
  alg = 3,
  crv = -1,
  x = -2,
  y = -3,
  n = -1,
  e = -2,
}

{
  "1": 2, // kty, EC2
      export enum COSEKTY
      OKP = 1,
      EC2 = 2,
      RSA = 3,
  "3": -7, // alg = ES256
    export enum COSEALG
      ES256 = -7,
      EdDSA = -8, // EdDSA(ed25519)
      ES384 = -35,
      ES512 = -36,
      PS256 = -37,
      PS384 = -38,
      PS512 = -39,
      ES256K = -47,
      RS256 = -257,
      RS384 = -258,
      RS512 = -259,
      RS1 = -65535,
  "-1": 1, // crv P256
      P256 = 1,
      P384 = 2,
      P521 = 3,
      ED25519 = 6,
  "-2": Uint8Array(32) [ // x
    197,  10,   7, 183, 214, 123,  71,   6,
    239, 126, 230, 108, 105, 171, 241, 253,
     63,  52,  43, 218,  56,   4, 252, 124,
     42, 216,  30,  82,  63, 255, 124,  73
  ],
  "-3": Uint8Array(32) [ // y
    202, 222, 243, 251, 220,  71,  27,  40,
     80,  54, 177, 104,   2,  29,  41, 255,
    254,   2,  98,  53,  11, 228,   3,  37,
     94,  79, 167, 197, 182, 148, 247, 187
  ]
}
*/
