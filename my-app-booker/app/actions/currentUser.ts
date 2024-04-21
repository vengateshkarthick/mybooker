import { getServerSession } from "next-auth/next";
import { authOptions } from "@api/auth/[...nextauth]";
import prisma from "@brooker-prismadb";

export async function getSessions() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSessions();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    return (
      {
        ...currentUser,
        createdAt: currentUser?.createAt?.toISOString() || null,
        updatedAt: currentUser?.createAt?.toISOString() || null,
        emailVerified: currentUser?.emailVerified?.toISOString() || null,
      } || null
    );
  } catch (err) {
    return null;
  }
}
