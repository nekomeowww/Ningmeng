// Essentials

const Telegraf = require('telegraf');
const Telegram = require('telegraf/telegram');
const log4js = require('log4js');
//const HttpsProxyAgent = require('https-proxy-agent');
let bot = require('../bot');
let config = require('../config');
let packageInfo = require('../package.json');
let msgctl = require('./message');
let nlpctl = require('./Message/nlp/nlp');

//Control Here

let message = {
    command: (action) => {
        let fullaction = action + "@" + config.username;
        switch(action){
            case "help":
                bot.Bot.command([action, fullaction], (ctx) => ctx.reply('随意说话就好啦w'));
                break;
            case "music":
                bot.Bot.command(action, (ctx) => ctx.reply('随意说话就好啦w'));
                break;
            case "nlp":
                bot.Bot.command(action, (ctx) => ctx.reply(msgctl.nlp(ctx.message.text)));
                break;
            case "nlpa":
                bot.Bot.command(action, (ctx) => ctx.reply(msgctl.nlp(ctx.message.text)));
                break;
            case "nlptagadd":
                bot.Bot.command(action, (ctx) => ctx.reply("还不支持哦！"));
                break;
            case "nlptagedit":
                bot.Bot.command(action, (ctx) => ctx.reply("还不支持哦！"));
                break;
            case "nlptagsearch":
                bot.Bot.command(action, (ctx) => ctx.reply("还不支持哦！"));
                break;
            case "info":
                info.info();
                break;
            default:
                Bot.command(action, (ctx) => ctx.reply('随意说话就好啦w'));
                break;
        }
    },

    hears: (msg) => {
        if(msg == 'hi') {
            Bot.hears('hi', (ctx) => ctx.reply('Hey there!'));
        }
    },

    hearsRpy: (msg, reply) => {
        Bot.hears(msg, (ctx) => {
            ctx.reply(reply);
        })
    },

    sticker: () => {
        Bot.on('sticker', (ctx) => {
            //
            fileid = ctx.message.sticker.file_id;
            logger.trace(fileid)
            TelegramClient.sendSticker(fileid);
        })
    }
}

let info = {
    info: () => {
        let commandIn = ["info", "info" + config.username];
        Bot.command(commandIn, (ctx) => {
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
        });
    }
}

// Control.start() to start a bot

exports.start = start;
exports.message = message;
exports.Bot = Bot;
exports.Telegram = Telegram;