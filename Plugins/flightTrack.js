let requestPromise = require('request-promise');
let cheerio = require('cheerio');

let config = require('../config');
let botctl = require('../control');

let plugin = {
  core(ctx) {
    if(config.plugins.flightTrack.enable) {
      this.start(ctx);
    }
    else {
      return "该插件未启用。";
    }
  },
  start: (ctx) => {
    tracker.core(ctx);
  }
}

let tracker = {
  core(ctx) {
    requestPromise(link)
    .then(function (htmlString) {
      // Process html...
    return parse(htmlString)
    })
    .catch(function (err) {
      // Crawling failed...
      
    });
  },
  parse(body) {
      var $ = cheerio.load(body);
      var result = $('div.statusLines').text().split('\n')
      return result;
  }
}

module.exports = plugin;

// Simplified Chinese
// https://www.cn.kayak.com/tracker/FLIGHT_NUMBER/FLIGHT_DATE

// Traditional Chinese
// https://www.kayak.com.hk/tracker/FLIGHT_NUMBER/FLIGHT_DATE

// United States: English
// https://www.kayak.com/tracker/FLIGHT_NUMBER/FLIGHT_DATE
