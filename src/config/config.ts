import dotenv from 'dotenv';

dotenv.config();

export interface BotConfig {
    token: string;
    mode: 'polling' | 'webhook';
    port?: number;
    webhookUrl?: string;
}

const requiredEnvVars = ['TELEGRAM_BOT_TOKEN'];
for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
    }
}

export const config: BotConfig = {
    token: process.env.TELEGRAM_BOT_TOKEN!,
    mode: (process.env.BOT_MODE as 'polling' | 'webhook') || 'polling',
    port: parseInt(process.env.PORT || '3000', 10),
    webhookUrl: process.env.WEBHOOK_URL,
};

if (config.mode === 'webhook' && !config.webhookUrl) {
    throw new Error('WEBHOOK_URL is required when BOT_MODE is set to webhook');
}