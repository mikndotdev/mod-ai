import type { GenerateObjectResult } from "ai";
import { z } from "zod";

export const schema = z.object({
    score: z.number(),
    reason: z.string(),
});

export interface Model {
    check: (
        message: string,
        systemprompt: string,
    ) => Promise<GenerateObjectResult<z.infer<typeof schema>>>;
    id: string;
    name: string;
    provider: string;
    emoji: string;
    isDefault: boolean;
}
