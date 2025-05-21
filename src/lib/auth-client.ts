"use client";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  returnHeaders: true,
  asResponse: true,
  fetchOptions: {
    onResponse: (ctx) => {
      const jwt = ctx.response.headers.get("set-auth-jwt");
      localStorage.setItem("jwt", jwt as string);
    },
  },
});
