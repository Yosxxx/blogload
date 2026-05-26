"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth/client";
import { registerSchema, signUpRequestNeonAuth } from "@/lib/validators/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { signUpUser } from "@/app/actions/auth.action";

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signUpRequestNeonAuth>({ resolver: zodResolver(registerSchema) });

  // Register
  async function onSubmit(input: signUpRequestNeonAuth) {

    // Signup NeonAuth
    const { data, error } = await authClient.signUp.email({
      email: input.email,
      name: input.name,
      password: input.password,
    });

    // Failed to create account NeonAuth
    if (error) return { error: error.message ?? "Failed to create account" };

    // Signup profile
    const dbResult = await signUpUser({
      id: data.user.id,
      email: data.user.email,
      name: input.name,
    });


    // Failed to signup profile
    if (dbResult?.error) return console.error(dbResult.error);

    redirect("/");
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Signup</CardTitle>
          <CardDescription>Enter credentials</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="signup-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" {...register("name")} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full" form="signup-form">
            Signup
          </Button>

          <div>
            Dont have an account yet?
            <Button asChild variant="link">
              <Link href={"/login"}>Login</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
