import "server-only";
import { prisma } from "@/lib/db";

export async function findDoc(id: string) {
  try {
    const document = await prisma.document.findFirst({
      where: { id },
    });
    return document;
  } finally {
    await prisma.$disconnect();
  }
}
