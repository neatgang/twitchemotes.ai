import { db } from "@/lib/db";
import Showcase from "./_components/showcase";

const ITEMS_PER_PAGE = 20;

export default async function ShowcasePage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1;
  const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;

  const where = search
    ? {
        OR: [
          { prompt: { contains: search } },
          { style: { contains: search } },
        ],
      }
    : {};

  const totalCount = await db.emote.count({ where });
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const emotes = await db.emote.findMany({
    where,
    take: ITEMS_PER_PAGE,
    skip: (page - 1) * ITEMS_PER_PAGE,
    orderBy: { createdAt: 'desc' },
  });

  return (
    <Showcase
      initialEmotes={emotes}
      currentPage={page}
      totalPages={totalPages}
      totalCount={totalCount}
      itemsPerPage={ITEMS_PER_PAGE}
    />
  );
}
