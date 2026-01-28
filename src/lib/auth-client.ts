import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // server url
  baseURL: "http://localhost:5000",
});
