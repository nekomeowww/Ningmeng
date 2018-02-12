// Dependencies

const nodemailer = require('nodemailer');

// Local Files

let config = require('../config');
let bot = require('../bot');
let control = require('../control');
let packageInfo = require('../package.json');

// Plugin Header

let pluginName = config.plugins.mail.name;
let pluginVersion = config.plugins.mail.version;

// Plugin Body

let hostname = config.plugins.mail.users[0].hostname;
let username = config.plugins.mail.users[0].username;
let password = config.plugins.mail.users[0].password; 

let plugin = {
    core(ctx) {
        if(config.plugins.mail.enable) {
            this.start(ctx);
        }
        else {
            bot.Log.warning("mail 插件未启用，用户无法使用该插件。");
            return ctx.reply("该插件未启用。");
        }
    },
    start(ctx) {
        let transporter = nodemailer.createTransport({
            host: hostname,
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: username, // generated ethereal user
                pass: password  // generated ethereal password
            }
        });

        let emailTo = control.command.commandCheck(ctx);
        this.email(emailTo, "NingmengBot", "Hello, NingmengBot", "Hello, <b>NingmengBot</b>");
    },
    email(mailTarget, emailSubject, content, htmlContent) {
        let transporter = nodemailer.createTransport({
            host: hostname,
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: username, // generated ethereal user
                pass: password  // generated ethereal password
            }
        });
    
        // Check Email
    
        let emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        let emailTarget;
        let botlog = bot.Log;
        if(emailPattern.test(String(mailTarget).toLowerCase())) {
                
            emailTarget = mailTarget.toLowerCase();
    
            let mailOptions = {
                from: config.nickname + "<" + username + ">",
                to: emailTarget,
                subject: config.username + " " + emailSubject,
                text: content,
                html: htmlContent
            };
    
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return botlog.fatal(error);
                }
                
                botlog.debug(config.nickname + "已经把邮件寄送给 " + emailTarget + " 啦！");
                
                /*
                console.log('Message sent: %s', info.messageId);
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                */
            });
        }
        else {

        }
    }
}

exports.pluginName = pluginName;
exports.pluginVersion = pluginVersion;
exports.plugin = plugin;