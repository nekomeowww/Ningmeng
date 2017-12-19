let bot = require('../bot');
let control = require('../control');

// Plugins

let flightTrack = require('./flightTrack');

let plugin = {
    control(ctx) {
        flightTrack.core(ctx);
        bot.Log.info();

    },
    track(ctx) {
        flightTrack.core(ctx);
    }
}

module.exports = plugin;
