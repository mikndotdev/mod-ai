import { type CommandInteraction, PermissionFlagsBits } from "discord.js";
import { PrismaClient } from "@prisma/client";
import { initGuildOrFetch } from "../handlers/guild-init-or-fetch";

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
        const guildDB = await initGuildOrFetch(interaction.guildId!);
        if (guildDB.active) {
            await db.guild.update({
                where: {
                    id: interaction.guildId!,
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
                    id: interaction.guildId!,
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
