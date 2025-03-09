import { generateObject } from "ai";
import { groq } from "@ai-sdk/groq";
import { schema } from "./interface";

export async function check(message: string, systemprompt: string) {
    const result = await generateObject({
        model: groq("llama-3.1-8b-instant"),
        schema,
        system: systemprompt,
        prompt: message,
    });

    return result;
}

export const name = "Llama 3.1 8b Instruct";
export const id = "llama-free";
export const provider = "Meta AI (via Groq)";
export const emoji = "<:meta:1348123671788785674>";
export const isDefault = false;
