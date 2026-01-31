import { env } from "@/env";
import { cookies } from "next/headers";

const authUrl = env.AUTH_URL;

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${authUrl}/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const data = await res.json();
      if (!data) {
        return {
          data: null,
          error: { message: "Session is missing" },
        };
      }

      return { data, error: null };
    } catch (err) {
      console.error(err);
      return {
        data: null,
        error: { message: "Something went wrong to get session." },
      };
    }
  },
};
