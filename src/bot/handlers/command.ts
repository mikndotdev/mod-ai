import {
    WebhookClient,
    EmbedBuilder,
    type ChatInputCommandInteraction,
} from "discord.js";
import crypto from "node:crypto";
import { commands } from "../commands";

const logginWebhook = new WebhookClient({
    url: process.env.LOGGING_WEBHOOK_URL as string,
});

const sendLog = async (message: string) => {
    const logId = crypto.randomBytes(4).toString("hex");
    const embed = new EmbedBuilder()
        .setTitle("Error Log")
        .setDescription(`\`\`\`ts\n${message}\n\`\`\``)
        .setColor("#FF0000")
        .setTimestamp();

    await logginWebhook
        .send({ content: `EID ${logId}`, embeds: [embed] })
        .catch(console.error);
    return logId;
};

export async function handleCommand(interaction: ChatInputCommandInteraction) {
    try {
        const command = commands.find(
            (c) => c.name === interaction.commandName,
        );
        if (!command) return;
        if (!command.slashCommand.enabled)
            return interaction.reply("This command is not enabled!");
        if (command.slashCommand.enabled)
            await command.interactionRun(interaction);
    } catch (error: any) {
        const logId = await sendLog(error.message);
        console.error(`Error while executing command: ${logId}`);
        const errorEmbed = new EmbedBuilder()
            .setTitle("An error occurred while executing this command!")
            .setDescription(
                `An error occurred while executing this command.\n\nEID ${logId}\n\nPlease contact support if this persists.`,
            )
            .setColor("#FF0000")
            .setTimestamp();
        await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
}
