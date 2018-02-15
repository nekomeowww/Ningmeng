// Local Files

let bot = require('../bot');
let control = require('../control');
let config = require('../config');

// Plugins

let flightTrack = require('./flightTrack');
let mail = require('./mail');
let watchdog = require('./watchdog');


let pluginList = [
    "已挂载插件: " + mail.pluginName + " [ 版本: " + mail.pluginVersion + " ] ",
    "已挂载插件: " + flightTrack.pluginName + " [ 版本: " + flightTrack.pluginVersion + " ] ",
    "已挂载插件: " + watchdog.pluginName + " [ 版本: " + watchdog.pluginVersion + " ] "
];

let plugin = {
    control: () => {
        for(var i = 0; i<pluginList.length; i++) {
            bot.Log.debug(pluginList[i]);
        };
    },
    track(ctx) {
        flightTrack.plugin.core(ctx);
    },
    mail(ctx) {
        mail.plugin.core(ctx);
    },
    watchdog() {
        watchdog.plugin.core();
    }
}

exports.pluginList = pluginList;
exports.plugin = plugin;
