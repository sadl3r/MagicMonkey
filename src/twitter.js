"use strict";

var TwitterHook = function() {
  var Twitter = require('twitter');

  this.client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  });
}

/**
 * Stream statuses filtered by keyword
 * number of tweets per second depends on topic popularity
 **/
TwitterHook.prototype.hookStreamModule = function(tags, callback) {
  this.client.stream('statuses/filter', {track: tags},  function(stream){
    stream.on('data', callback);
    stream.on('error', function(error) {
      console.log(error);
    });
  });
}

module.exports = TwitterHook;