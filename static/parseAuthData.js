import { CBOR } from "https://js.sabae.cc/CBOR.js";
import { subbin, bin2i } from "https://js.sabae.cc/binutil.js";

export const parseAuthData = (authData) => {
  if (authData.length < 37) {
    throw new Error(
      `Authenticator data was ${authData.length} bytes, expected at least 37 bytes`,
    );
  }

  let pointer = 0;
  //console.log(authData.buffer.byteLength, authData.length, abuf.byteLength)
  //const dataView = new DataView(abuf);
  console.log(authData);
  //const dataView = new DataView(authData);
  
  const rpIdHash = subbin(authData, pointer, pointer += 32); //authData.slice(pointer, pointer += 32);
  console.log(rpIdHash); //, authData.slice(0, 32));

  //const flagsBuf = authData.slice(pointer, pointer += 1);
  const flagsInt = authData[pointer]; //(new Uint8Array(flagsBuf))[0];
  pointer++;
  console.log({ rpIdHash, flagsInt, /*flagsBuf*/ })

  // Bit positions can be referenced here:
  // https://www.w3.org/TR/webauthn-2/#flags
  const flags = {
    up: !!(flagsInt & (1 << 0)), // User Presence
    uv: !!(flagsInt & (1 << 2)), // User Verified
    be: !!(flagsInt & (1 << 3)), // Backup Eligibility
    bs: !!(flagsInt & (1 << 4)), // Backup State
    at: !!(flagsInt & (1 << 6)), // Attested Credential Data Present
    ed: !!(flagsInt & (1 << 7)), // Extension Data Present
    flagsInt,
  };
  console.log(flags);

  //const counterBuf = subbin(authData, pointer, 4, authData.length - pointer); //authData.slice(pointer, pointer + 4);
  const counter = bin2i(authData, pointer);
  pointer += 4;
  //const counter = dataView.getUint32(pointer, false);
  //console.log("counter", counterBuf);

  let aaguid = undefined;
  let credentialID = undefined;
  let credentialPublicKey = undefined;

  if (flags.at) {
    aaguid = subbin(authData, pointer, 16); //authData.slice(pointer, pointer += 16);
    pointer += 16;
    console.log("aaguid", aaguid);

    const credIDLen = (authData[pointer] << 8) | (authData[pointer + 1]); //dataView.getUint16(pointer);
    console.log("credIDLen", credIDLen, pointer);
    pointer += 2;

    credentialID = subbin(authData, pointer, credIDLen); //authData.slice(pointer, pointer += credIDLen);
    pointer += credIDLen;
    console.log("credentialID", credentialID)

    // Decode the next CBOR item in the buffer, then re-encode it back to a Buffer
    const firstDecoded = CBOR.decodeFirst(subbin(authData, pointer, authData.length - pointer));
    console.log("decode", firstDecoded);
    const firstEncoded = CBOR.encode(firstDecoded);

    console.log(firstEncoded, firstDecoded);
    credentialPublicKey = firstEncoded;
    pointer += firstEncoded.length;
  }

  let extensionsData = undefined;
  let extensionsDataBuffer = undefined;

  if (flags.ed) {
    const firstDecoded = CBOR.decodeFirst(subbin(authData, pointer));
    extensionsDataBuffer = CBOR.encode(firstDecoded);
    extensionsData = CBOR.decode(extensionsDataBuffer);
    pointer += extensionsDataBuffer.length;
  }

  // Pointer should be at the end of the authenticator data, otherwise too much data was sent
  if (authData.byteLength > pointer) {
    throw new Error('Leftover bytes detected while parsing authenticator data');
  }
  const pubkey = CBOR.decode(credentialPublicKey);
  //console.log(pubkey);
  //auth.credentialPublicKey = pubkey;

  return {
    rpIdHash,
    //flagsBuf,
    flags,
    counter,
    //counterBuf,
    aaguid,
    credentialID,
    credentialPublicKey: pubkey,
    extensionsData,
    extensionsDataBuffer,
  };
}
