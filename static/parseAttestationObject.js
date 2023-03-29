import { CBOR } from "https://js.sabae.cc/CBOR.js";
import { parseAuthData } from "./parseAuthData.js";

export const parseAttestationObject = (bin) => {
  const aobj = CBOR.decode(new Uint8Array(bin));
  const authData = aobj.authData;
  aobj.authData = parseAuthData(authData);
  return aobj;
};
