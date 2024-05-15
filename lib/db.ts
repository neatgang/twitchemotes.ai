import { Client } from '@planetscale/database';
import { PrismaPlanetScale } from '@prisma/adapter-planetscale';
import { PrismaClient } from '@prisma/client';

import { fetch as undiciFetch } from 'undici';

const connectionString = `${process.env.DATABASE_URL}`;

const client = new Client({ url: connectionString, fetch: undiciFetch });
const adapter = new PrismaPlanetScale(client);

declare global {
    var prisma: PrismaClient | undefined;
};

export const db = globalThis.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
    globalThis.prisma = db;
};