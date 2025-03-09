import { type CommandInteraction, PermissionFlagsBits } from "discord.js";

export default {
	name: "ping",
	description: "Replies with Pong!",
	botPermissions: [],
	userPermissions: [PermissionFlagsBits.ManageGuild],
	validations: [],
	slashCommand: {
		enabled: true,
		options: [],
	},
	interactionRun: async (interaction: CommandInteraction) => {
		const ping = Math.abs(Math.round(interaction.client.ws.ping));
		await interaction.reply("<a:loading:1329263345932566539>");
		const roundtrip = Math.abs(Date.now() - interaction.createdTimestamp);
		interaction.editReply(
			`API Latency: ${ping}ms\nRoundtrip: ${roundtrip}ms`,
		);
	},
};
