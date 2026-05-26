import Link from "next/link";
import { Button } from "./ui/button";
import { auth } from "@/lib/auth/server";
import LogoutButton from "@/components/logout-button";

export default async function Navbar() {
  const { data: session } = await auth.getSession();

  const user = session?.user;

  return (
    <nav className="flex min-h-24 items-center justify-around border-b px-8">
      <h1 className="text-4xl font-bold">blogload</h1>

      <div className="flex items-center gap-2">
        {!user ? (
          <>
            <Button asChild variant="ghost" className="px-6 py-4">
              <Link href="/signup">Register</Link>
            </Button>

            <Button asChild className="px-6 py-4">
              <Link href="/login">Login</Link>
            </Button>
          </>
        ) : (
          <>
            <Button asChild className="px-6 py-4">
              <Link href="/create">Create</Link>
            </Button>

            <LogoutButton />
          </>
        )}
      </div>
    </nav>
  );
}
