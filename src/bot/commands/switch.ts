import {
	type CommandInteraction,
	PermissionFlagsBits,
	StringSelectMenuBuilder,
	ActionRowBuilder,
	ApplicationCommandOptionType,
} from "discord.js";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export default {
	name: "switch",
	description: "Enable or disable AI moderation",
	botPermissions: [],
	userPermissions: [PermissionFlagsBits.ManageGuild],
	validations: [],
	slashCommand: {
		enabled: true,
		options: [],
	},
	interactionRun: async (interaction: CommandInteraction) => {
		const guildDB = await db.guild.findUnique({
			where: {
				id: interaction.guildId as string,
			},
		});
		if (guildDB.active) {
			await db.guild.update({
				where: {
					id: interaction.guildId as string,
				},
				data: {
					active: false,
				},
			});
			await interaction.reply({
				content: "AI moderation disabled",
				flags: "Ephemeral",
			});
		} else {
			await db.guild.update({
				where: {
					id: interaction.guildId as string,
				},
				data: {
					active: true,
				},
			});
			await interaction.reply({
				content: "AI moderation enabled",
				flags: "Ephemeral",
			});
		}
	},
};
