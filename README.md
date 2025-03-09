# AI Moderation Bot

A Discord bot that uses AI to moderate server content. This bot can analyze messages, detect inappropriate content, and help maintain a positive community environment.

## Features

- AI-powered content moderation
- Multiple AI model support
- Server-specific configuration
- Logging of moderation actions
- Debug and moderation log channels
- Discord slash commands for easy configuration

## Prerequisites

- [Bun](https://bun.sh) runtime (v1.2.4 or newer)
- Discord bot token
- Database (supported by Prisma)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mikndotdev/ai-mod.git
   cd ai-mod
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Configure environment variables:
   Create a `.env` file with the following:
   ```
   DATABASE_URL="your-database-url"
   DISCORD_TOKEN="your-discord-bot-token"
   GOOGLE_GENERATIVE_AI_API_KEY="your-google-generative-ai-api-key"
   GROQ_API_KEY="your-groq-api-key"
   ```

4. Initialize the database:
   ```bash
   bunx prisma migrate dev
   ```

## Running the Bot

```bash
bun run src/index.ts
```

## Commands

- `/settings` - View current server settings (requires Manage Server permission)
- More commands available for configuration and moderation

## Docker Deployment

The bot can be deployed using Docker:

```bash
docker build -t ai-mod .
docker run -d --env-file .env ai-mod
```

Alternatively, you can pull the pre-built image:
```bash
docker pull ghcr.io/mikndotdev/mod-ai:latest
```