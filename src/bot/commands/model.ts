import {
    type CommandInteraction,
    PermissionFlagsBits,
    StringSelectMenuBuilder,
    ActionRowBuilder,
} from "discord.js";
import { models } from "../../inference/models";
import { initGuildOrFetch } from "../handlers/guild-init-or-fetch";

export default {
    name: "model",
    description: "Set which model to use for moderation",
    botPermissions: [],
    userPermissions: [PermissionFlagsBits.ManageGuild],
    validations: [],
    slashCommand: {
        enabled: true,
        options: [],
    },
    interactionRun: async (interaction: CommandInteraction) => {
        await initGuildOrFetch(interaction.guildId!);
        const modelSelect = new StringSelectMenuBuilder()
            .setCustomId("modelSelect")
            .setPlaceholder("Select a model")
            .addOptions(
                Object.entries(models).map(([key, model]) => ({
                    label: model.name,
                    value: `${key}`,
                    emoji: model.emoji,
                    description: `Provider: ${model.provider}`,
                })),
            );

        const row =
            new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
                modelSelect,
            );

        await interaction.reply({
            content: "Select a model to use for moderation",
            components: [row],
            flags: "Ephemeral",
        });
    },
};
