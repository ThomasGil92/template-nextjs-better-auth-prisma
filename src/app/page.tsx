import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(), // some endpoint might require headers
  });

  return (
    <p>hello</p>
  );
}
