import { Base64URL } from "https://code4fukui.github.io/Base64URL/Base64URL.js";

export const isoBase64URL = {
  fromBuffer: (bin) => {
    //return Base64URL.decode(bin);
    return Base64URL.encode(bin);
  },
};
export const isoUint8Array = {
  fromASCIIString: (s) => new TextEncoder().encode(s),
};
