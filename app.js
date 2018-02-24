let got = require('got');
const Koa = require('koa');
const koaBody = require('koa-body');

let bot = require('./bot');
let config = require('./config');
let plugin = require('./Plugins/plugin');
let packageInfo = require('./package.json');

let Time = new Date();
let CurrentTime = Time.getFullYear() + "-" + ("0"+(Time.getMonth()+1)).slice(-2) + "-" + ("0" + Time.getDate()).slice(-2) + "-" + ("0" + Time.getHours()).slice(-2) + "-" + ("0" + Time.getMinutes()).slice(-2) + "-" + ("0" + Time.getSeconds()).slice(-2);

bot.Log.info("开始时间：" + CurrentTime + " - " + config.username + " 版本：" + packageInfo.version);
//bot.Log.debug("已选择 Polling")
bot.botctl.start()
//bot.Bot.startPolling();

    bot.Log.debug("已选择 Webhook")
    bot.Log.info("当前 Webhook 设定：" + config.webhook.url + config.webhook.path + " 在端口 " + config.webhook.port);

    let webhookUrl = config.webhook.url;
    let webhookPath = config.webhook.path;
    let webhookPort = config.webhook.port;

    const app = new Koa();

    bot.botctl.start();

    bot.Bot.telegram.setWebhook(webhookUrl + webhookPath);

    app.use(koaBody());
    app.use((ctx, next) => ctx.method === 'POST' || ctx.url === webhookPath
        ? bot.Bot.handleUpdate(ctx.request.body, ctx.response)
        : next()
    )

    app.use(async (ctx,next) => {
        if(ctx.method === 'GET' && ctx.url === '/watchDog') {
            ctx.statusCode = 200
            await plugin.plugin.watchdog();
        }
        await next()
    })
    
    app.listen(config.webhook.truePort, "127.0.0.1");

bot.Log.info("柠檬现在已经在线上啦！");
