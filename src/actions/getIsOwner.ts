import "server-only";
import { prisma } from "@/lib/db";

export async function getIsOwner(id: string, ownerId: string) {
  try {
    const count = await prisma.document.count({
      where: {
        id,
        ownerId,
      },
    });
    return count !== 0;
  } finally {
    await prisma.$disconnect();
  }
}
