"use client";
import { authClient } from "@/lib/auth/client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await authClient.signOut();

    router.push("/");
    router.refresh();
  }

  return (
    <Button
      className="px-6 py-4 hover:cursor-pointer"
      onClick={handleLogout}
      variant={"destructive"}
    >
      Logout
    </Button>
  );
}
