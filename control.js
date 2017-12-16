// Local Files

let bot = require('./bot');
let config = require('./config');
let msgctl = require('./Bot/message');
let stkctl = require('./Bot/sticker');
let plugin = require('./Plugins/plugin');
let packageInfo = require('./package.json');

let core = {
    control: () => {
        // Command

        bot.Bot.command(command.register('/start'), (ctx) => ctx.reply("你好喔，这里是柠檬酱。想要开始的话直接选择命令或者直接说话就好了喔w"));
        bot.Bot.command(command.register('/help'), (ctx) => ctx.reply("随意说话就好了喵w"));
        bot.Bot.command(command.register('/info'), (ctx) => info.info(ctx));
        bot.Bot.command(command.register('/progynova'), (ctx) => ctx.reply("是黄色的糖糖! "));
        bot.Bot.command(command.register('/pat'), (ctx) => ctx.reply("（呼噜呼噜声"));
        bot.Bot.command(command.register('/flight'), (ctx) => plugin.track(ctx));

        // Context Processing
        
        // Text Handling
        let botlog = bot.Log;
        let msgcore = msgctl.msgctl;

        bot.Bot.on('text', (ctx) => {

            let output = "来自: ";
            if(ctx.message.from.first_name && ctx.message.from.last_name) {
                botlog.trace(output + ctx.message.from.first_name + " " + ctx.message.from.last_name + " - " + ctx.message.text);
            }
            else if(ctx.message.from.username) {
                botlog.trace(output + ctx.message.from.username + " - " + ctx.message.text)                
            }
            else {
                botlog.trace(output + ctx.message.from.id + " - " + ctx.message.text)
            }

            // Port to processor
            msgcore.core(ctx);
            return ctx.message.text;
        })
        // Sticker Handling
        bot.Bot.on('sticker', (ctx) => {
            stkctl.core(ctx);
        });
        // Photo Handling
        bot.Bot.on('photo', (ctx) => {
            //bot.Log.debug(ctx.message);
        });
        //Channel Post Handling
        bot.Bot.on('channel_post', (ctx) => {

        });
    }
}

let command = {
    register: (commandName) => {
        commands = [commandName, commandName + bot.botUsername];
        return commands;
    },

    commandCheck: (ctx) => {
        let result = "";
        let text = ctx.message.text;
        let split = text.indexOf(' ');

        if(/@NingmengBot/gi.test(text)) {
            result = text.slice(split + 1);
            return result;
        }
        else {
            result = text.slice(split + 1);
            return result;
        }
    }
}

let info = {
    info: (ctx) => {
        let Version = bot.botUsername + " 版本: " + packageInfo.version;
        let messageId = "Message ID: " + ctx.message.message_id;
        let messageType = "Message Type: " + ctx.message.chat.type;
        let senderId = "Sender ID: " + ctx.message.from.id;

        let chatTitle = "Chat Title: " + ctx.message.chat.title;
        let chatId = "Chat ID: " +  ctx.message.chat.id;

        let happyChat = "希望你开心喔！";
        let happyGroup = "希望你喜欢" + config.nickname + "喔！";

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

exports.core = core;
exports.command = command;