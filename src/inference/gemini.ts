import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { schema } from "./interface";

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
        schema,
        system: systemprompt,
        prompt: message,
        temperature: 0,
    });
    return result;
}

export const name = "Gemini 2.0 Flash-Lite";
export const id = "gemini-free";
export const provider = "Google";
export const emoji = "<:gemini:1348100497273393194>";
export const isDefault = true;
