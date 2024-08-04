import { ES256KSigner, hexToBytes } from "did-jwt";
import {
  createVerifiableCredentialJwt,
  createVerifiablePresentationJwt,
} from "did-jwt-vc";

// Create a singer by using a private key (hex).
const key = "dfbbb5cf3203fa999bf5312ae57ec1b6e4eab45b29e5d376748aaab3b51c01c9";
const signer = ES256KSigner(hexToBytes(key));

// Prepare an issuer
const issuer = {
  did: "did:web:subash68.github.io",
  signer: signer,
};

// Prepare the Verifiable Credential Payload
const vcPayload = {
  sub: "did:web:subash68.github.io",
  nbf: Math.floor(new Date().getTime() / 1000),
  vc: {
    "@context": ["https://www.w3.org/2018/credentials/v1"],
    type: ["VerifiableCredential"],
    credentialSubject: {
      citizen: {
        type: "Passport",
        name: "United States of America",
      },
    },
  },
};

// Create the Verifiable Credential (JWT)
const vcJwt = await createVerifiableCredentialJwt(vcPayload, issuer);
console.log("//// Verifiable Credential:\n", vcJwt);

// Prepare the Verifiable Presentation Payload
const vpPayload = {
  vp: {
    "@context": ["https://www.w3.org/2018/credentials/v1"],
    type: ["VerifiablePresentation"],
    verifiableCredential: [vcJwt],
    // foo: "bar",
  },
};

// Create the Verifiable Presentation (JWT)
const vpJwt = await createVerifiablePresentationJwt(vpPayload, issuer);
console.log("\n//// Verifiable Presentation:\n", vpJwt);

// Resolve and Verify
