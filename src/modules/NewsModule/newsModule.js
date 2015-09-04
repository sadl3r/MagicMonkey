"use strict";

var NewsModule = function() {
	console.log("init news module");
}

NewsModule.prototype.onStreamHook = function(tweet) {
	console.log("news " + tweet.text);
}

module.exports = NewsModule;
