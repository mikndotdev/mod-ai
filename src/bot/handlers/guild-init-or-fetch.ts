import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export async function initGuildOrFetch(guildId: string) {
    const guild = await db.guild.findUnique({
        where: {
            id: guildId,
        },
    });
    if (guild) return guild;
    return await db.guild.create({ data: { id: guildId } });
}
