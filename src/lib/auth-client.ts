import { createAuthClient } from "better-auth/react";
import { customSessionClient } from "better-auth/client/plugins";
import type { Auth } from "../server/auth/auth-types";

export const authClient = createAuthClient({
  plugins: [customSessionClient<Auth>()],
});
