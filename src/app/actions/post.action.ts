"use server"
import { getCurrentUser } from "@/lib/auth/server";
import prisma from "@/lib/prisma/prisma";
import { createPostRequest } from "@/types/post";

export async function createPost(request: createPostRequest) {
  const user = await getCurrentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const { title, content } = request;

  if (!title || !content) {
    return { error: "Title and content are required." };
  }

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: user.id, 
      },
    });
    return { success: true, post };
  } catch (error: any) {
    return { error: error.message || "Failed to create post." };
  }
}

export async function likePost() {}

export async function editPost() {}
