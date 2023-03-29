import { Base16 } from "https://code4fukui.github.io/Base16/Base16.js";

export const encodeHEX = (obj) => {
  if (obj instanceof Uint8Array) {
    return Base16.encode(obj);
  } else if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      obj[i] = encodeHEX(obj[i]);
    }
  } else if (typeof obj == "object") {
    for (const name in obj) {
      obj[name] = encodeHEX(obj[name]);
    }
  }
  return obj;
};
