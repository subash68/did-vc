import { createJWT, ES256KSigner, hexToBytes } from "did-jwt";

// Create a singer by using a private key (hex).
const key = "dfbbb5cf3203fa999bf5312ae57ec1b6e4eab45b29e5d376748aaab3b51c01c9";
const signer = ES256KSigner(hexToBytes(key));

// Create a signed JWT
const accountA = await createJWT(
  { aud: "did:web:subash68.github.io", name: "Account 1" },
  { issuer: "did:web:subash68.github.io", signer },
  { alg: "ES256K" }
);

console.log(`//// JWT (Account A):\n${accountA} \n`);

const accountB = await createJWT(
  { aud: "did:web:subash68.github.io", name: "Account 2" },
  { issuer: "did:web:subash68.github.io", signer },
  { alg: "ES256K" }
);

console.log(`//// JWT (Account B):\n${accountB}\n`);
