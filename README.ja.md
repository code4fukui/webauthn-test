# WebAuthn Test

WebAuthnの登録プロセス（アテステーション）を検証するためのユーティリティとテスト環境のコレクションです。このプロジェクトには、クレデンシャルの作成と結果の解析を行うクライアントサイドのデモと、登録オプションを生成するDenoベースのサーバーが含まれています。

## デモ

- [Local WebAuthn Check](https://code4fukui.github.io/webauthn-test/static/localcheck.html)

このページでは、ローカルでのWebAuthn登録を試すことができます。`navigator.credentials.create()` を呼び出した後、クライアントサイドでアテステーションオブジェクトを解析し、デコードされたオーセンティケーターデータを表示します。

## 機能

*   **クライアントサイドデモ (`static/localcheck.html`):** WebAuthnの登録セレモニーを開始するためのインタラクティブなページです。オーセンティケーターからのレスポンスを取得し、ブラウザ上で直接アテステーションオブジェクトを解析します。
*   **アテステーション & AuthData パーサー (`static/parseAttestationObject.js`, `static/parseAuthData.js`):** CBORエンコードされたアテステーションオブジェクトとオーセンティケーターデータをデコードし、フラグ、カウンター、公開鍵などの内容を確認するためのクライアントサイドJavaScriptモジュールです。
*   **登録オプションの生成 (`server.js`, `generateRegistrationOptions.js`):** 登録オプションを動的に作成するためのAPIエンドポイント (`/api/registerRequest`) を提供するDenoサーバーです。
    *   `authenticatorSelection`、`attestation` コンベイアンス、および `pubKeyCredParams`（例: ES256の場合は `alg: -7`、RS256の場合は `alg: -257`）のカスタマイズをサポートしています。
    *   `generateRegistrationOptions.js` のコアロジックは、[SimpleWebAuthn](https://github.com/MasterKale/SimpleWebAuthn) ライブラリを参考にしています。
*   **不完全なサーバーサイド検証:** `/api/registerResponse` エンドポイントはプレースホルダーであり、実際の検証は行いません。現在のデモでは、すべての解析がクライアントサイドで行われます。

## 使用方法

### クライアントサイドデモ

テストページを試す最も簡単な方法は、以下のGitHub Pagesのリンクにアクセスすることです:
[https://code4fukui.github.io/webauthn-test/static/localcheck.html](https://code4fukui.github.io/webauthn-test/static/localcheck.html)

### サーバーの実行

サーバーは登録オプションを生成するためのAPIを提供します。実行には [Deno](https://deno.land/) が必要です。

```sh
deno run --allow-net server.js
```

サーバーが起動したら、`/api/registerRequest` にPOSTリクエストを送信して登録オプションを取得できます。

## 参考資料

- [WebAuthn](https://www.w3.org/TR/webauthn-2/)
- [SimpleWebAuthn](https://github.com/MasterKale/SimpleWebAuthn)
