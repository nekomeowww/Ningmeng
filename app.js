let bot = require('./bot');
let botctl = require('./Control/control');
let msgctl = require('./Control/message');

msgctl.start();
bot.Bot.startPolling();