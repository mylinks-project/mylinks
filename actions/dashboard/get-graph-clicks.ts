import { prisma } from "@/lib/prisma";

interface GraphData {
  id: string;
  userId: string;
  visitorId: string | null;
  ipAddress: string | null;
  country: string | null;
  city: string | null;
  postalCode: string | null;
  device: string | null;
  browser: string | null;
  referer: string | null;
  visitAt: Date;
}

export const getGraphProfileVisits = async (userId: string): Promise<GraphData[]> => {
  const visits = await prisma.profileVisit.findMany({
    where: {
      userId: userId
    },
  });

  return visits;
}