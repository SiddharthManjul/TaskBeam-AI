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
  command: "/help",
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

    await bot.sendMessage(chatId, helpMessage, { parse_mode: "Markdown" });
  },
};

export const echoCommand: BotCommand = {
  command: "/echo",
  description: "Echo back your message",
  handler: async (
    bot: TelegramBot,
    msg: TelegramBot.Message,
    match: RegExpExecArray | null
  ) => {
    const chatId = msg.chat.id;
    const text = match && match[1] ? match[1] : "";

    if (!text.trim()) {
      await bot.sendMessage(
        chatId,
        "! Please provide text to echo!\n\nExample: `/echo Hello World`",
        { parse_mode: "Markdown" }
      );
      return;
    }
    await bot.sendMessage(chatId, `You said: ${text}`);
  },
};

export const timeCommand: BotCommand = {
  command: "/time",
  description: "Get current date & time",
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

    await bot.sendMessage(chatId, timeMessage, { parse_mode: "Markdown" });
  },
};

export const jokeCommand: BotCommand = {
  command: "/joke",
  description: "Get a random programming joke",
  handler: async (bot: TelegramBot, msg: TelegramBot.Message) => {
    const chatId = msg.chat.id;

    const jokes = [
      "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
      "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡",
      "Why don't programmers like nature? It has too many bugs! 🌿🐛",
      "A SQL query goes into a bar, walks up to two tables and asks: 'Can I join you?' 🍺",
      "Why do Java developers wear glasses? Because they don't C# 👓",
      "There are only 10 types of people in the world: those who understand binary and those who don't! 🤖",
      "Why did the programmer quit his job? He didn't get arrays! 📊",
      "A programmer is told to 'go to hell', he finds the worst part of that statement is the 'go to' 😈",
    ];

    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    await bot.sendMessage(chatId, `😄 ${randomJoke}`);
  },
};

export const weatherCommand: BotCommand = {
  command: "/weather",
  description: "Get weather information (demo)",
  handler: async (bot: TelegramBot, msg: TelegramBot.Message) => {
    const chatId = msg.chat.id;

    // This is a demo - in a real bot, you'd integrate with a weather API
    const demoWeather = `
🌤️ *Weather Demo*

📍 Location: Demo City
🌡️ Temperature: 22°C (72°F)
💧 Humidity: 65%
💨 Wind: 10 km/h
☁️ Conditions: Partly Cloudy

_Note: This is demo data. To get real weather, integrate with a weather API like OpenWeatherMap._
    `;

    await bot.sendMessage(chatId, demoWeather, { parse_mode: "Markdown" });
  },
};
