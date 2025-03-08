import { generateObject} from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";

export async function check(message: string) {
  const result = await generateObject({
      model: google("gemini-2.0-flash-lite-preview-02-05", {
          structuredOutputs: true,
      }),
      schema: z.object({
          score: z.number(),
          reason: z.string()
      }),
  })
}