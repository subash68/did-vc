import { verifyJWT, decodeJWT } from "did-jwt";
import { Resolver } from "did-resolver";
import { getResolver } from "web-did-resolver";

// // This sample data //
const account =
  "eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJpYXQiOjE3MjI3NjI3OTAsImF1ZCI6ImRpZDp3ZWI6c3ViYXNoNjguZ2l0aHViLmlvIiwibmFtZSI6IkFjY291bnQgMiIsImlzcyI6ImRpZDp3ZWI6c3ViYXNoNjguZ2l0aHViLmlvIn0.TvabjsCiwXW61fas2Cnk1lwiucZbfVKrRiJGm2C7iCEJEUMFbM44_pC9SPj3uiX3mBUP86QJhS5ZVk8qUKNacQ";

// Decode the JWT
const decoded = decodeJWT(account);
console.log("\n//// JWT Decoded:\n", decoded);

// Verify the JWT by resolving its DID:WEB
const webResolver = getResolver();
const resolver = new Resolver({
  ...webResolver,
});

verifyJWT(account, {
  resolver,
  audience: "did:web:subash68.github.io",
}).then(({ payload, doc, did, signer, jwt }) => {
  console.log("\n//// Verified:\n", payload);
});
