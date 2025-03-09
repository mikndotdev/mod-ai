import { PrismaClient } from "@prisma/client";
import { type StringSelectMenuInteraction } from "discord.js";
import { models } from "../../inference/models.ts";

const db = new PrismaClient();

export async function setModel(interaction: StringSelectMenuInteraction) {
	const model = interaction.values[0];
	const guildId = interaction.guildId;
	await db.guild.update({
		where: {
			id: guildId as string,
		},
		data: {
			model,
		},
	});
	const modelName = models[model].name;
	await interaction.reply({
		content: `Model set to ${modelName}`,
		flags: "Ephemeral",
	});
}
