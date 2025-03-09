import * as gemini from "./gemini";
import * as llama from "./llama";
import * as qwen from "./qwen";
import type { Model } from "./interface";

export const models: Record<string, Model> = {
    [gemini.id]: gemini,
    [llama.id]: llama,
    [qwen.id]: qwen,
};

export const defaultModel = Object.values(models).find((m) => m.isDefault)!;
