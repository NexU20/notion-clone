import "server-only";
import { prisma } from "@/lib/db";
import { InitialDoc } from "@/types/db";

export async function getInitialDoc(ownerId: string) {
  try {
    const documents: InitialDoc = await prisma.document.findFirst({
      where: { ownerId },
      select: { id: true },
    });
    return documents;
  } finally {
    await prisma.$disconnect();
  }
}
