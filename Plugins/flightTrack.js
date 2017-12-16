let requestPromise = require('request-promise');
let cheerio = require('cheerio');

let bot = require('../bot');
let config = require('../config');
let control = require('../control');

let flightStatus;

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
    if(ctx.message.text.includes('/flight')) {
      tracker.command(ctx);
    }
    else {
      tracker.core(ctx);
    }
  }
}

let tracker = {
  command(ctx) {
    let data = control.command.commandCheck(ctx);
    bot.Log.debug(data);

    let flightNumPattern = /(([A-Z])|(\d))(([A-Z])|(\d))((-)|( )|())((\d\d\d\d)|(\d\d\d))/gi;
    let flightNumInputPattern = /(([A-Z])|(\d))(([A-Z])|(\d))(-)((\d\d\d\d)|(\d\d\d))/gi;
    let flightNum = new String(""); 
    let flightData = flightNumPattern[Symbol.match](data);
    if(!flightData || flightData == null) {
      ctx.reply("柠檬不知道你的航班号是什么了啦");
      ctx.reply("使用方法： /flight AR-NUMB YYYY-MM-DD");
      ctx.reply("AR 是航空公司短标识，NUMB 是航线标识，日期格式应为：1970-01-01");
      return;
    }

    let Time = new Date();
    let CurrentTime = Time.getFullYear() + "-" + ("0"+(Time.getMonth()+1)).slice(-2) + "-" + ("0" + Time.getDate()).slice(-2);
    
    bot.Log.debug(CurrentTime);

    let date;
    let datePattern = /(\d\d\d\d)-(\d\d)-(\d\d)/g;
    date = datePattern[Symbol.match](data);
    if(!date || date == null) {
      date = CurrentTime;
    }

    let flight;
    let botlog = bot.Log;
    flightNum += flightData
    botlog.debug(typeof(flightNum));

    if(!flightNumInputPattern.test(flightNum)) {

      let flightNumInputPattern1 = /(([A-Z])|(\d))(([A-Z])|(\d))( )((\d\d\d\d)|(\d\d\d))/gi; // Add a space
      let flightNumInputPattern2 = /(([A-Z])|(\d))(([A-Z])|(\d))((\d\d\d\d)|(\d\d\d))/gi; // Add a desh

      if(flightNumInputPattern1.test(flightNum)) {
        botlog.fatal("NotMatchFormatException: Missing Space");
        let array = flightNum.split(' ');
        let airline = array[0];
        let lineNum = array[1];
        flight = airline + "-" + lineNum;
      }
      if(flightNumInputPattern2.test(flightNum)) {
        botlog.fatal("NotMatchFormatException: Missing Dash");
        let airline = flightNum.slice(0, 2);
        let lineNum = flightNum.replace(airline, '');
        flight = airline + "-" + lineNum;
      }
    }
    else {
      flight = flightNum;
    }

    let info = [flight, date]
    this.core(ctx, info, data);
  },
  core(ctx, info, flight) {
    bot.Log.debug("用户 " + ctx.message.from.id + " 申请查询航班信息: " + info);

    // Link Prefix

    let linkPrefix;
    switch(config.plugins.flightTrack.locale) {
      case "zh-CHS":
        linkPrefix = "https://www.cn.kayak.com/tracker/";
        break;
      case "zh-CHT":
        linkPrefix = "https://www.kayak.com.hk/tracker/";
        break;
      case "en-US":
        linkPrefix = "https://www.kayak.com/tracker/";
        break;
      default:
        linkPrefix = "https://www.kayak.com/tracker/";
        break;
    }

    let link = linkPrefix + info[0] + "/" + info[1];

    bot.Log.debug(link);

    let status;
    
    requestPromise(link)
    .then(function (htmlString) {
      // Process html...
      status = newArray(parse(htmlString));

      bot.Log.debug(status);

      for(var i; i < status.length; i++) {
        ctx.reply(status[i]);
      }

      return status;
    })
    .catch(function (err) {
      // Crawling failed...
      ctx.reply("抱歉，航班查询服务目前暂不可用。");
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
