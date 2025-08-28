import TelegramBot from "node-telegram-bot-api";

export interface BotCommand {
    command: string;
    description: string;
    handler: (bot: TelegramBot, msg: TelegramBot.Message, match: RegExpExecArray | null) => Promise<void>;
}

export interface BotContext {
    bot: TelegramBot;
    chatId: number;
    userId: number;
    username?: string;
    firstName?: string;
    lastName?: string;
}

export interface UserSession {
    userId: number;
    chatId: number;
    state?: string;
    data?: Record<string, any>;
    lastActivity: Date;
}