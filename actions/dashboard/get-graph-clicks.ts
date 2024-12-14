import { prisma } from "@/lib/prisma";
import { GraphData } from "@/types/types";

export const getGraphProfileVisits = async (userId: string): Promise<GraphData[]> => {
  const visits = await prisma.profileVisit.findMany({
    where: {
      userId: userId
    },
  });

  return visits;
}