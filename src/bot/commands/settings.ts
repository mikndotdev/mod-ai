import {
    PermissionFlagsBits,
    EmbedBuilder,
    Colors,
    type ChatInputCommandInteraction,
} from "discord.js";
import { defaultModel, models } from "../../inference/models.ts";
import { initGuildOrFetch } from "../handlers/guild-init-or-fetch.ts";

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
    interactionRun: async (interaction: ChatInputCommandInteraction) => {
        const guildDB = await initGuildOrFetch(interaction.guildId!);
        const model = models[guildDB.model] ?? defaultModel;
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
                    value: `${model.emoji} ${model.name}`,
                },
                {
                    name: "Moderation Threshold",
                    value: guildDB.threshold.toString(),
                },
            )
            .setTimestamp();

        await interaction.reply({
            embeds: [embed],
            flags: "Ephemeral",
        });
    },
};
