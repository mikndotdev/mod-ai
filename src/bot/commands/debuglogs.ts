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
	name: "debuglogs",
	description: "Set a debug log channel",
	botPermissions: [],
	userPermissions: [PermissionFlagsBits.ManageGuild],
	validations: [],
	slashCommand: {
		enabled: true,
		options: [
			{
				name: "channel",
				description: "The channel to set as the debug log channel",
				type: ApplicationCommandOptionType.Channel,
				required: true,
			},
		],
	},
	interactionRun: async (interaction: CommandInteraction) => {
		const channel = interaction.options.getChannel("channel");
		await db.guild.update({
			where: {
				id: interaction.guildId as string,
			},
			data: {
				debuglog_channel_id: channel.id,
			},
		});
		await interaction.reply({
			content: `Debug log channel set to ${channel}`,
			flags: "Ephemeral",
		});
	},
};
