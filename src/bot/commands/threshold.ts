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
	name: "threshold",
	description: "Set the threshold before moderation is triggered",
	botPermissions: [],
	userPermissions: [PermissionFlagsBits.ManageGuild],
	validations: [],
	slashCommand: {
		enabled: true,
		options: [
			{
				name: "threshold",
				description: "The threshold before moderation is triggered",
				type: ApplicationCommandOptionType.Integer,
				setMinValue: 0,
				setMaxValue: 1000,
				required: true,
			},
		],
	},
	interactionRun: async (interaction: CommandInteraction) => {
		const threshold = interaction.options.getInteger("threshold");
		if (threshold < 0 || threshold > 1000) {
			await interaction.reply({
				content: "Threshold must be between 0 and 1000",
				flags: "Ephemeral",
			});
			return;
		}
		await db.guild.update({
			where: {
				id: interaction.guildId as string,
			},
			data: {
				threshold: threshold,
			},
		});
		await interaction.reply({
			content: `Moderation threshold set to ${threshold}`,
			flags: "Ephemeral",
		});
	},
};
