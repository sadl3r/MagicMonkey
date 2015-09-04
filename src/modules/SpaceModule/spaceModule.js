"use strict";

var SpaceModule = function() {
	console.log("init space module");
}

SpaceModule.prototype.onStreamHook = function(tweet) {
	console.log("space " + tweet.text);
}

module.exports = SpaceModule;
