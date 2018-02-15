# NingmengBot - Just a Cute Bot

Now work with NingmengAPI at https://api.ayaka.moe

## Core

### NLP

Thanks to [@zhangyubaka](https://github.com/zhangyubaka) for NLP resouce.

This project will use [NodeJieba](https://github.com/yanyiwu/nodejieba).

### Mood Analyze

This module has the ability to recommend the music from YouTube and CloudMusic as the status of your current mood.

### NingmengAPI

## Plugin System

### Essential Plugins

- Flight Track
- Weather Report
- Watch Dog [for Cachet]

## Configuration

### Nginx reverse configuration for webhook

Here is an example

```
server {
        listen 443 ssl http2;
        # listen [::]:443 ssl;

        server_name telegram.ayaka.moe;

        ssl on;
        ssl_certificate /path to your fullchain/fullchain.pem;
        ssl_certificate_key /path to your privkey/privkey.pem;
        ssl_prefer_server_ciphers on;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_ciphers "EECDH+ECDSA+AESGCM EECDH+aRSA+AESGCM EECDH+ECDSA+SHA384 EECDH+ECDSA+SHA256 EECDH+aRSA+SHA384 EECDH+aRSA+SHA256 EECDH+aRSA+RC4 EECDH EDH+aRSA !aNULL !eNULL !LOW !3DES !MD5 !EXP !PSK !SRP !DSS !RC4";
        keepalive_timeout 70;
        ssl_session_cache shared:SSL:10m;
        ssl_session_timeout 10m;

        add_header Strict-Transport-Security max-age=63072000;
        # add_header X-Frame-Options DENY;
        add_header X-Content-Type-Options nosniff;


        location / {
		proxy_pass http://127.0.0.1:8500;
    	}

}
```
