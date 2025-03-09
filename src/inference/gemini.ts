import { generateObject, generateText } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";

export async function check(message: string, systemprompt: string) {
	const result = await generateObject({
		model: google("gemini-2.0-flash-lite", {
			safetySettings: [
				{
					category: "HARM_CATEGORY_HARASSMENT",
					threshold: "BLOCK_NONE",
				},
				{
					category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
					threshold: "BLOCK_NONE",
				},
				{
					category: "HARM_CATEGORY_HATE_SPEECH",
					threshold: "BLOCK_NONE",
				},
				{
					category: "HARM_CATEGORY_DANGEROUS_CONTENT",
					threshold: "BLOCK_NONE",
				},
			],
		}),
		schema: z.object({
			score: z.number(),
			reason: z.string(),
		}),
		system: systemprompt,
		prompt: message,
	});
	return result;
}
