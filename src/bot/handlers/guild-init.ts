import { type Guild } from "discord.js";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export async function initGuild(guild: Guild) {
	console.log(`Initializing guild ${guild.name}`);
	await db.guild.create({
		data: {
			id: guild.id,
		},
	});
}
