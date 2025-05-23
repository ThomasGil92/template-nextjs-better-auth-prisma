"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignoutButton() {
  const router = useRouter();
  async function handleSignout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          authClient.getSession()
          router.refresh(); 
        },
      },
    });
    // Optionally redirect
    // redirect('/signin');
  }
  return <button onClick={handleSignout}>Se deconnecter</button>;
}
