import TelegramBot from "node-telegram-bot-api";
import { BotCommand } from "../types/bot.types";

export const startCommand: BotCommand = {
  command: "/start",
  description: "Start the bot and get welcome message",
  handler: async (bot: TelegramBot, msg: TelegramBot.Message) => {
    const chatId = msg.chat.id;
    const userName = msg.from?.first_name || "there";
    const welcomeMessage = `
        *Welcome, ${userName}!*
        
        I'm a simple TypeScript Telegram bot. Here's what I can do:

        /start - Show this welcome message
        /help - Get list of available commands
        /echo <text> - Echo back your message
        /time - Get current time
        /joke - Get a random joke
        /weather - Get weather info (demo)
        /ping - Check if bot is responsive

Try any of these commands to get started!
    `;

    await bot.sendMessage(chatId, welcomeMessage, { parse_mode: "Markdown" });
  },
};

export const helpCommand: BotCommand = {
    command: '/help',
    description: "Get list of available commands",
    handler: async (bot: TelegramBot, msg: TelegramBot.Message) => {
        const chatId = msg.chat.id;
        const helpMessage = `
        *Available Commands:*
        
        /start - Welcome message and bot introduction
        /help - Show the help message
        /echo <text> - Echo back your message
        /time - Get current time
        /joke - Get a random joke
        /weather - Get weather information (demo)
        /ping - Test bot responsiveness
        
        Just type any command to use it!
        `;

        await bot.sendMessage(chatId, helpMessage, {parse_mode: 'Markdown'});
    },
};

export const echoCommand: BotCommand = {
    command: '/echo',
    description: 'Echo back your message',
    handler: async (bot: TelegramBot, msg: TelegramBot.Message, match: RegExpExecArray | null) => {
        const chatId = msg.chat.id;
        const text = match && match[1] ? match[1] : "";

        if (!text.trim()) {
            await bot.sendMessage(chatId, '! Please provide text to echo!\n\nExample: `/echo Hello World`', {parse_mode: 'Markdown' });
            return;
        }
        await bot.sendMessage(chatId, `You said: ${text}`);
    },
};

export const timeCommand: BotCommand = {
    command: '/time',
    description: 'Get current date & time',
    handler: async (bot: TelegramBot, msg: TelegramBot.Message) => {
        const chatId = msg.chat.id;
        const now = new Date();
        const timeMessage = `
        *Current Date & Time*
        
        Date: ${now.toLocaleDateString()}
        Time: ${now.toLocaleTimeString()}
        Timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}
        Unix Timestamp: ${Math.floor(now.getTime() / 1000)}
        `;

        await bot.sendMessage(chatId, timeMessage, { parse_mode: 'Markdown' });
    }
};
