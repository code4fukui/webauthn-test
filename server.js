import { serveAPI } from "https://js.sabae.cc/wsutil.js";
import { generateRegistrationOptions } from "./generateRegistrationOptions.js";

const RP_NAME = "test_rp";
const HOSTNAME = "t.xgc.jp";
const TIMEOUT = 1000 * 10;

let session = {};

const registerRequest = async (param) => {
  const username = "test_username"; // req.session.username;
  const user = "test_user"; // Users.findByUsername(username);
  try {
    const excludeCredentials = [];
    /*
    if (user.credentials.length > 0) {
      for (let cred of user.credentials) {
        excludeCredentials.push({
          id: isoBase64URL.toBuffer(cred.credId),
          type: 'public-key',
          transports: ['internal'],
        });
      }
    }
    */
    const pubKeyCredParams = [];
    // const params = [-7, -35, -36, -257, -258, -259, -37, -38, -39, -8];
    const params = [-7, -257];
    for (let param of params) {
      pubKeyCredParams.push({ type: 'public-key', alg: param });
    }
    const as = {}; // authenticatorSelection
    const aa = param.authenticatorSelection.authenticatorAttachment;
    const rr = param.authenticatorSelection.requireResidentKey;
    const uv = param.authenticatorSelection.userVerification;
    const cp = param.attestation; // attestationConveyancePreference
    let asFlag = false;
    let authenticatorSelection;
    let attestation = 'none';

    if (aa && (aa == 'platform' || aa == 'cross-platform')) {
      asFlag = true;
      as.authenticatorAttachment = aa;
    }
    if (rr && typeof rr == 'boolean') {
      asFlag = true;
      as.requireResidentKey = rr;
    }
    if (uv && (uv == 'required' || uv == 'preferred' || uv == 'discouraged')) {
      asFlag = true;
      as.userVerification = uv;
    }
    if (asFlag) {
      authenticatorSelection = as;
    }
    if (cp && (cp == 'none' || cp == 'indirect' || cp == 'direct')) {
      attestation = cp;
    }

    const options = await generateRegistrationOptions({
      rpName: RP_NAME,
      rpID: HOSTNAME,
      userID: user.id,
      userName: user.username,
      timeout: TIMEOUT,
      // Prompt users for additional information about the authenticator.
      attestationType: attestation,
      // Prevent users from re-registering existing authenticators
      excludeCredentials,
      authenticatorSelection,
    });

    //req.session.challenge = options.challenge;

    // Temporary hack until SimpleWebAuthn supports `pubKeyCredParams`
    options.pubKeyCredParams = [];
    for (let param of params) {
      options.pubKeyCredParams.push({ type: 'public-key', alg: param });
    }
    return options;
  } catch (e) {
    console.log(e);
    return null;
  }
};
const registerResponse = async (param) => {

/*
    const credential = req.body as RegistrationCredentialJSON;

    const expectedChallenge = req.session.challenge;
    const expectedRPID = res.locals.hostname;
 
    let expectedOrigin = getOrigin(res.locals.origin, req.get('User-Agent'));

    const verification = await verifyRegistrationResponse({
      credential,
      expectedChallenge,
      expectedOrigin,
      expectedRPID,
    });
*/

};

serveAPI("/api/", async (param, req, path, connInfo) => {
  console.log(path, req, param, connInfo)
  if (path == "/api/registerRequest") {
    console.log("param", param)
    return await registerRequest(param);
  } else if (path == "/api/registerResponse") {
    console.log("param", param)
    return await registerResponse(param);
  }
  return { response: "OK", param };
});
