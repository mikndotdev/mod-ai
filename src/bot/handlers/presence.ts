import { Client, ActivityType } from "discord.js";

export function setPresence(client: Client) {
	const setActivity = () => {
		const serverCount = client.guilds.cache.size;
		client.user?.setPresence({
			activities: [
				{
					name: `moderating ${serverCount} servers | /setup`,
					type: ActivityType.Competing,
				},
			],
			status: "idle",
		});
	};
	setActivity();
	setInterval(setActivity, 1000 * 60 * 60);
}
