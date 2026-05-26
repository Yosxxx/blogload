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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createPostSchema } from "@/lib/validators/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createPostRequest } from "@/types/post";
import { createPost } from "@/app/actions/post.action";
import { redirect, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function Page() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<createPostRequest>({ resolver: zodResolver(createPostSchema) });

  const router = useRouter();

  function resetPost() {
    reset({
      title: "",
      content: "",
    });
  }

  async function onSubmit(request: createPostRequest) {
    const result = await createPost({
      title: request.title,
      content: request.content,
    });

    if (result?.error) return console.error(result.error);

    redirect("/");
  }

  return (
    <div className="h-screen justify-center items-center flex flex-col">
      <div className="w-full max-w-2xl">

      <Button className="mb-2 hover:cursor-pointer" variant={"link"} onClick={() => router.back()}>
        <ArrowLeft />
        Back
      </Button>

      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Create a post</CardTitle>
          <CardDescription>Be creative about your post!</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="create-post-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label>Title</Label>
                <Textarea
                  id="title"
                  className="max-h-12 "
                  {...register("title")}
                  maxLength={150}
                ></Textarea>
                {errors.title && (
                  <p className="text-red-500">{errors.title.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label>Content</Label>
                <Textarea
                  id="content"
                  className="max-h-96"
                  {...register("content")}
                  maxLength={1400}
                ></Textarea>
                {errors.content && (
                  <p className="text-red-500">{errors.content.message}</p>
                )}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex space-x-2 justify-end">
          <Button variant={"outline"} className="min-w-48" onClick={resetPost}>
            Clear
          </Button>
          <Button type="submit" className="min-w-48" form="create-post-form">
            Post
          </Button>
        </CardFooter>
      </Card>
      </div>
    </div>
  );
}
