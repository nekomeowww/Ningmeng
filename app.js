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

bot.Bot.telegram.setWebhook(webhookUrl + webhookPath);

app.use(koaBody());
app.use((ctx, next) => ctx.method === 'POST' || ctx.url === webhookPath
    ? bot.Bot.handleUpdate(ctx.request.body, ctx.response)
    : next()
);

bot.Log.info("柠檬现在已经在线上啦！");

app.listen(webhookPort);