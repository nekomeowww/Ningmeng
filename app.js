// Local Files

let bot = require('./bot');
let config = require('./config');

bot.botctl.start();
bot.Log.info("柠檬现在已经在线上啦！");
bot.Bot.startPolling();