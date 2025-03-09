import { Client, GatewayIntentBits, Partials } from "discord.js";
import { deployCommands } from "./bot/handlers/deploy.ts";
import { setPresence } from "./bot/handlers/presence.ts";
import { handleCommand } from "./bot/handlers/command.ts";
import { checkMessage } from "./bot/handlers/message.ts";
import { setModel } from "./bot/handlers/set-model.ts";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.MessageContent,
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user?.tag}!`);
    deployCommands();
    setPresence(client);
});

client.on("interactionCreate", async (interaction) => {
    if (interaction.isChatInputCommand()) {
        console.log(`Received command: ${interaction.commandName}`);
        try {
            await handleCommand(interaction);
        } catch (e) {
            console.error(e);
        }
    }
    if (interaction.isButton()) {
        console.log(`Received button: ${interaction.customId}`);
    }
    if (interaction.isStringSelectMenu()) {
        if (interaction.customId === "modelSelect") {
            setModel(interaction);
        }
    }
});

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    console.log("Received message!");
    checkMessage(message);
});

client.login(process.env.BOT_TOKEN);

process
    .on("uncaughtException", (e) => {
        console.error(e);
    })
    .on("unhandledRejection", (e) => {
        console.error(e);
    });
