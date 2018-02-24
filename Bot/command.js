let bot = require('../bot');
let config = require('../config');
let plugin = require('../Plugins/plugin');
let control = require('../core');
let packageInfo = require('../package.json');

let info = {

    // Returns the info of this bot
    // This command will also print the caller info into logs

    info: (ctx) => {
        let Version = bot.botUsername + " 版本: " + packageInfo.version;
        let messageId = "Message ID: " + ctx.message.message_id;
        let messageType = "Message Type: " + ctx.message.chat.type;
        let senderId = "Sender ID: " + ctx.message.from.id;

        let chatTitle = "Chat Title: " + ctx.message.chat.title;
        let chatId = "Chat ID: " +  ctx.message.chat.id;

        let happyChat = "希望你开心喔！";
        let happyGroup = "希望你喜欢" + config.nickname + "喔！";

        let pluginList = plugin.pluginList;

        ctx.reply(Version + "\n" + "\n" + pluginList[0] + "\n" + pluginList[1] + "\n" + pluginList[2]);
        
        bot.Log.debug(">>> INFO -" + ctx.message.date + "- Report");
        bot.Log.debug(messageId);
        bot.Log.debug(messageType);
        bot.Log.debug(senderId);

        if(ctx.message.chat.type == 'private') {
            ctx.reply(happyChat);
            bot.Log.debug(">>> INFO Report END <<<");
        }
        else {
            ctx.reply(happyGroup);

            bot.Log.debug(chatTitle);
            bot.Log.debug(chatId);
            bot.Log.debug(">>> INFO Report END <<<");
        }
    }
}

module.exports = info;