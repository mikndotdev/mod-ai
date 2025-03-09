import {
    PermissionFlagsBits,
    ApplicationCommandOptionType,
    type ChatInputCommandInteraction,
    ChannelType,
} from "discord.js";
import { PrismaClient } from "@prisma/client";
import { initGuildOrFetch } from "../handlers/guild-init-or-fetch";

const db = new PrismaClient();

export default {
    name: "modlogs",
    description: "Set a modlogs channel",
    botPermissions: [],
    userPermissions: [PermissionFlagsBits.ManageGuild],
    validations: [],
    slashCommand: {
        enabled: true,
        options: [
            {
                name: "channel",
                description: "The channel to set as the modlogs channel",
                type: ApplicationCommandOptionType.Channel,
                required: true,
                channel_types: [
                    ChannelType.GuildText,
                    ChannelType.GuildAnnouncement,
                    ChannelType.GuildVoice,
                    ChannelType.PublicThread,
                    ChannelType.PrivateThread,
                ],
            },
        ],
    },
    interactionRun: async (interaction: ChatInputCommandInteraction) => {
        await initGuildOrFetch(interaction.guildId!);
        const channel = interaction.options.getChannel("channel")!;
        await db.guild.update({
            where: {
                id: interaction.guildId!,
            },
            data: {
                modlog_channel_id: channel.id,
            },
        });
        await interaction.reply({
            content: `Modlogs channel set to ${channel}`,
            flags: "Ephemeral",
        });
    },
};
