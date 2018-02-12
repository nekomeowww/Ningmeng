// Dependencies

let got = require('got');

// Local Files

let bot = require('./bot');
let config = require('./config');

bot.botctl.start();

if(config.mode === "polling") {
    bot.Bot.startPolling();
}
else if(config.mode === "webhook") {
    // Webhook

    const Koa = require('koa');
    const koaBody = require('koa-body');

    // Local Files

    let bot = require('./bot');
    let config = require('./config');

    let webhookUrl = config.webhook.url;
    let webhookPath = config.webhook.path;
    let webhookPort = config.webhook.port;

    const app = new Koa();

    bot.botctl.start();

    bot.Bot.telegram.setWebhook(webhookUrl + webhookPath);

    let getHEAD = async (url) => {
        try {
            await got.head(url);
            bot.Log.trace(url+ 'OK!');
        }
        catch (err) { 
            bot.Log.fatal(err)      
        }
    }

    app.use(koaBody());
    app.use((ctx, next) => ctx.method === 'POST' || ctx.url === webhookPath
        ? bot.Bot.handleUpdate(ctx.request.body, ctx.response)
        : next()
    );

    app.use(async (ctx,next) => {
        if(ctx.method === 'GET' || ctx.url === '/watchDog')
        {
            ctx.statusCode = 200
            await getHEAD("https://api.ayaka.moe")
            await getHEAD("https://git.ayaka.moe")
            await getHEAD("https://community.ayaka.moe");
            await getHEAD("https://download.ayaka.moe")
            await getHEAD("https://horizon.ayaka.moe")
            await getHEAD("https://cloud.ayaka.moe")
            await getHEAD("https://drive.ayaka.moe")
        }
        await next()
    }
)


    app.listen(webhookPort);
    }

else {
    console.log("Config file invalid");
}

bot.Log.info("柠檬现在已经在线上啦！");