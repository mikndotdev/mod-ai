import {
	type CommandInteraction,
	PermissionFlagsBits,
	StringSelectMenuBuilder,
	ActionRowBuilder,
	ApplicationCommandOptionType,
	EmbedBuilder,
	Colors,
} from "discord.js";
import { PrismaClient } from "@prisma/client";
import { models } from "../../inference/models.ts";

const db = new PrismaClient();

export default {
	name: "settings",
	description: "Check current settings",
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
		const embed = new EmbedBuilder()
			.setTitle("Settings")
			.setColor(guildDB.active ? Colors.Green : Colors.Red)
			.addFields(
                {
                    name: "AI Moderation",
                    value: guildDB.active ? "Enabled" : "Disabled",
                },
				{
					name: "Debug Log Channel",
					value: guildDB.debuglog_channel_id
						? `<#${guildDB.debuglog_channel_id}>`
						: "Not set",
				},
				{
					name: "Mod Log Channel",
					value: guildDB.modlog_channel_id
						? `<#${guildDB.modlog_channel_id}>`
						: "Not set",
				},
				{
					name: "Model",
					value: `${models[guildDB.model].emoji} ${models[guildDB.model].name}`,
				},
                {
                    name: "Moderation Threshold",
                    value: guildDB.threshold.toString(),
                }
			)
			.setTimestamp();

		await interaction.reply({
			embeds: [embed],
			flags: "Ephemeral",
		});
	},
};
