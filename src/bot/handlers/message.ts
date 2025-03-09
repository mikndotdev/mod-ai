import { models } from "../../inference/models";
import {
	type Message,
	EmbedBuilder,
	Colors,
	TextChannel,
	DMChannel,
	NewsChannel,
} from "discord.js";
import { PrismaClient } from "@prisma/client";
import path from "node:path";

const db = new PrismaClient();

const sendLog = async (
	message: Message,
	channel: string,
	score: number,
	reason: string,
) => {
	const embed = new EmbedBuilder()
		.setTitle("Message Check")
		.setDescription(`\`\`\`\n${message}\n\`\`\``)
		.setColor("#FF0000")
		.addFields(
			{ name: "Author", value: message.author.tag },
			{ name: "Channel", value: `<#${message.channelId}>` },
			{ name: "Score", value: score.toString() },
			{ name: "Reason", value: reason || "None" },
		)
		.setColor(Colors.Green)
		.setTimestamp();

	const ch = await message.guild?.channels.fetch(channel);
	if (
		ch &&
		(ch instanceof TextChannel ||
			ch instanceof DMChannel ||
			ch instanceof NewsChannel)
	) {
		await ch.send({ embeds: [embed] });
	}
};

const sendModLog = async (
	message: Message,
	channel: string,
	score: number,
	reason: string,
) => {
	const embed = new EmbedBuilder()
		.setTitle("Message Blocked")
		.setDescription(`\`\`\`\n${message}\n\`\`\``)
		.setColor("#FF0000")
		.addFields(
			{ name: "Author", value: message.author.tag },
			{ name: "Channel", value: `<#${message.channelId}>` },
			{ name: "Score", value: score.toString() },
			{ name: "Reason", value: reason || "None" },
		)
		.setColor(Colors.Red)
		.setTimestamp();

	const ch = await message.guild?.channels.fetch(channel);
	if (
		ch &&
		(ch instanceof TextChannel ||
			ch instanceof DMChannel ||
			ch instanceof NewsChannel)
	) {
		await ch.send({ embeds: [embed] });
	}
};

const warnUser = async (message: Message, score: number, reason: string) => {
	const embed = new EmbedBuilder()
		.setTitle("Your message was blocked by AI moderation")
		.setDescription(`\`\`\`\n${message}\n\`\`\``)
		.setColor("#FF0000")
		.addFields({ name: "Reason", value: reason || "None" })
		.setColor(Colors.Red)
		.setTimestamp();

	try {
		await message.author.send({ embeds: [embed] });
	} catch (error) {
		console.error(`Failed to send DM to ${message.author.tag}`);
	}
};

export async function checkMessage(message: Message) {
	if (message.author.bot) return;
	if (!message.guildId) return;
	const guildDB = await db.guild.findUnique({
		where: { id: message.guildId as string },
	});

	if (!guildDB) return;
	if (!guildDB.active) return;

	const model = models[guildDB.model];
	if (!model) return;

	try {
		const handlerPath = path.resolve(__dirname, "../../..", model.handler);
		const handlerModule = await import(handlerPath);
		const { check } = handlerModule;
		const result = await check(message.content, guildDB.system_prompt);
		if (result.object.score < guildDB.threshold) {
			if (guildDB.debuglog_channel_id) {
				await sendLog(
					message,
					guildDB.debuglog_channel_id as unknown as string,
					result.object.score,
					result.object.reason,
				);
			}
		} else {
			await message.delete();
			await warnUser(message, result.object.score, result.object.reason);
			await sendModLog(
				message,
				guildDB.modlog_channel_id as unknown as string,
				result.object.score,
				result.object.reason,
			);
		}
	} catch (error) {
		console.error(
			`Error loading model handler for ${guildDB.model}:`,
			error,
		);
	}
}
