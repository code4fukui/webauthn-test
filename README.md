# WebAuthn Test

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A collection of utilities and a test environment for exploring the WebAuthn registration process (attestation). This project includes a client-side demo for creating credentials and parsing the results, along with a Deno-based server for generating registration options.

## Demo

- [Local WebAuthn Check](https://code4fukui.github.io/webauthn-test/static/localcheck.html)

This page allows you to perform a local WebAuthn registration. It calls `navigator.credentials.create()` and then parses the attestation object on the client-side to display the decoded authenticator data.

## Features

*   **Client-Side Demo (`static/localcheck.html`):** An interactive page to initiate a WebAuthn registration ceremony. It captures the response from the authenticator and parses the attestation object directly in the browser.
*   **Attestation & AuthData Parsers (`static/parseAttestationObject.js`, `static/parseAuthData.js`):** Client-side JavaScript modules for decoding CBOR-encoded attestation objects and authenticator data to inspect their contents, including flags, counter, and the public key.
*   **Registration Option Generation (`server.js`, `generateRegistrationOptions.js`):** A Deno server that exposes an API endpoint (`/api/registerRequest`) to dynamically create registration options.
    *   Supports customizing `authenticatorSelection`, `attestation` conveyance, and `pubKeyCredParams` (e.g., `alg: -7` for ES256, `alg: -257` for RS256).
    *   The core logic in `generateRegistrationOptions.js` is adapted from the [SimpleWebAuthn](https://github.com/MasterKale/SimpleWebAuthn) library.
*   **Incomplete Server-Side Verification:** The `/api/registerResponse` endpoint is a placeholder and does not perform verification. All parsing currently happens on the client in the demo.

## Usage

### Client-Side Demo

The easiest way to use the test page is via the GitHub Pages link:
[https://code4fukui.github.io/webauthn-test/static/localcheck.html](https://code4fukui.github.io/webauthn-test/static/localcheck.html)

### Running the Server

The server provides an API for generating registration options. It requires [Deno](https://deno.land/).

```sh
deno run --allow-net server.js
```

The server will start, and you can send POST requests to `/api/registerRequest` to get registration options.

## Reference

- [WebAuthn](https://www.w3.org/TR/webauthn-2/)
- [SimpleWebAuthn](https://github.com/MasterKale/SimpleWebAuthn)