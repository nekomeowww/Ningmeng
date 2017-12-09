// Local Files

let botctl = require('./bot');
let config = require('./config');
let packageInfo = require('./package.json');

let botUsername = "@" + config.username;


let core = {
    control: () => {
        // Command
        botctl.Bot.command(command.register('/help'), (ctx) => ctx.reply("随意说话就好了喵w"));
        botctl.Bot.command(command.register('/commandCheck'), (ctx) => ctx.reply(command.commandCheck(ctx.message.text)));
        botctl.Bot.command(command.register('/info'), (ctx) => info.info(ctx));
        botctl.Bot.hears('喵', (ctx) => ctx.reply('喵'));
    }
}

let command = {
    register: (commandName) => {
        commands = [commandName, commandName + botUsername];
        botctl.Log.debug(commands);
        return commands;
    },

    commandCheck: (text) => {
        let result = "";
        
        botctl.Log.debug("Data before slice: " + text);

        if(/@NingmengBot/gi.test(text)) {
            result = text.slice(26);
            botctl.Log.debug("Data after slice: " + result);
        }
        else {
            result = text.slice(14);
            botctl.Log.debug("Data after slice: " + result);
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

        botctl.Log.trace(">>> INFO -" + ctx.message.date + "- Report");
        botctl.Log.trace(messageId);
        botctl.Log.trace(messageType);
        botctl.Log.trace(senderId);

        if(ctx.message.chat.type == 'private') {
            ctx.reply(happyChat);
            botctl.Log.trace(">>> INFO Report END <<<");
        }
        else {
            ctx.reply(happyGroup);

            botctl.Log.trace(chatTitle);
            botctl.Log.trace(chatId);
            botctl.Log.trace(">>> INFO Report END <<<");
        }
    }
}

module.exports = core;