import { generateObject } from "ai";
import { groq } from "@ai-sdk/groq";
import { schema } from "./interface";

export async function check(message: string, systemprompt: string) {
    const result = await generateObject({
        model: groq("qwen-2.5-32b"),
        schema: schema,
        system: systemprompt,
        prompt: message,
        temperature: 0,
    });

    return result;
}

export const name = "Qwen 2.5 32B";
export const id = "qwen-free";
export const provider = "Alibaba Cloud (via Groq)";
export const emoji = "<:qwen:1348130342522982470>";
export const isDefault = false;
