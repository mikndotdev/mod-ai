export const models = {
	gemini: {
		name: "Gemini 2.0 Flash-Lite",
		provider: "Google",
		handler: "src/inference/gemini.ts",
		emoji: "<:gemini:1348100497273393194>",
	},
	llama: {
		name: "Llama-3.1-8B",
		provider: "Meta AI (via Groq)",
		handler: "src/inference/llama.ts",
		emoji: "<:meta:1348123671788785674>",
	},
	qwen: {
		name: "Qwen 2.5 32B",
		provider: "Alibaba Cloud (via Groq)",
		handler: "src/inference/qwen.ts",
		emoji: "<:qwen:1348130342522982470>",
	},
};
