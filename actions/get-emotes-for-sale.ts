import { db } from "@/lib/db";

export const getEmotesForSale = async ({
  page = 1,
  itemsPerPage = 20,
  search = ''
}: {
  page?: number;
  itemsPerPage?: number;
  search?: string;
}) => {
  const skip = (page - 1) * itemsPerPage;

  const whereClause = search
    ? {
        prompt: {
          contains: search,
          mode: 'insensitive' as const,
        },
      }
    : {};

  const [emotesForSale, totalCount] = await Promise.all([
    db.emoteForSale.findMany({
      where: whereClause,
      skip,
      take: itemsPerPage,
      orderBy: {
        createdAt: "desc",
      },
    }),
    db.emoteForSale.count({
      where: whereClause,
    }),
  ]);

  return { emotesForSale, totalCount };
};