import { generateObject } from "ai";
import { groq } from "@ai-sdk/groq";
import { z } from "zod";

export async function check(message: string, systemprompt: string) {
	const result = await generateObject({
		model: groq("qwen-2.5-32b"),
		schema: z.object({
			score: z.number(),
			reason: z.string(),
		}),
		system: systemprompt,
		prompt: message,
	});

	return result;
}
