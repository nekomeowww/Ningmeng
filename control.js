// Local Files

let bot = require('./bot');
let config = require('./config');
let msgctl = require('./Bot/message');
let stkctl = require('./Bot/sticker');
let packageInfo = require('./package.json');

let core = {
    control: () => {
        // Command

        bot.Bot.command(command.register('/help'), (ctx) => ctx.reply("随意说话就好了喵w"));
        bot.Bot.command(command.register('/commandCheck'), (ctx) => ctx.reply(command.commandCheck(ctx.message.text)));
        bot.Bot.command(command.register('/info'), (ctx) => info.info(ctx));
        bot.Bot.hears('喵', (ctx) => ctx.reply('喵'));

        // Context Processing
        
        // Text Handling
        bot.Bot.on('text', (ctx) => {
            bot.Log.trace(ctx.message.text);
            msgctl.core(ctx);
            return ctx.message.text
        })
        // Sticker Handling
        bot.Bot.on('sticker', (ctx) => {
            stkctl.core(ctx);
            return ctx.reply('喵 /');
        });
        // Photo Handling
        bot.Bot.on('photo', (ctx) => {
            //bot.Log.debug(ctx.message);
            return ctx.reply('喵 /');
        });
        //Channel Post Handling
        bot.Bot.on('channel_post', (ctx) => {

        });
    }
}

let command = {
    register: (commandName) => {
        commands = [commandName, commandName + bot.botUsername];
        bot.Log.debug(commands);
        return commands;
    },

    commandCheck: (text) => {
        let result = "";
        
        bot.Log.debug("Data before slice: " + text);

        if(/@NingmengBot/gi.test(text)) {
            result = text.slice(26);
            bot.Log.debug("Data after slice: " + result);
        }
        else {
            result = text.slice(14);
            bot.Log.debug("Data after slice: " + result);
        }
    }
}

let info = {
    info: (ctx) => {
        let Version = "Bot Version: " + packageInfo.version;
        let messageId = "Message ID: " + ctx.message.message_id;
        let messageType = "Message Type: " + ctx.message.chat.type;
        let senderId = "Sender ID: " + ctx.message.from.id;

        let chatTitle = "Chat Title: " + ctx.message.chat.title;
        let chatId = "Chat ID: " +  ctx.message.chat.id;

        let happyChat = "希望你开心喔！";
        let happyGroup = "希望你喜欢柠檬喔！";

        ctx.reply(Version);

        bot.Log.trace(">>> INFO -" + ctx.message.date + "- Report");
        bot.Log.trace(messageId);
        bot.Log.trace(messageType);
        bot.Log.trace(senderId);

        if(ctx.message.chat.type == 'private') {
            ctx.reply(happyChat);
            bot.Log.trace(">>> INFO Report END <<<");
        }
        else {
            ctx.reply(happyGroup);

            bot.Log.trace(chatTitle);
            bot.Log.trace(chatId);
            bot.Log.trace(">>> INFO Report END <<<");
        }
    }
}

module.exports = core;