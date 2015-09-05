"use strict";

var NewsModule = function() {
}

NewsModule.prototype.onStreamHook = function(tweet) {
	console.log("news " + tweet.text);
}

module.exports = NewsModule;
