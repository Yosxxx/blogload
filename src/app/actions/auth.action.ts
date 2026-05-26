"use server"
import prisma from "@/lib/prisma/prisma";
import { createProfileRequest } from "@/types/profile";

export async function signUpUser(request: createProfileRequest) {
  try {
    await prisma.profile.create({
      data: {
        id: request.id,
        email: request.email,
        name: request.name,
      },
    });
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to create database profile." };
  }
}
