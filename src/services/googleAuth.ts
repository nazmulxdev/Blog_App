import { env } from "@/env";
import { authClient } from "@/lib/auth-client";

const callBackUrl = env.NEXT_PUBLIC_CALLBACK_URL;
export const googleSignin = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
    callbackURL: `${callBackUrl}`,
  });

  console.log(data);
};
