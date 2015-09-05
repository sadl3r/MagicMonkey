"use strict";

var SpaceModule = function() {
}

SpaceModule.prototype.onStreamHook = function(tweet) {
	console.log("space " + tweet.text);
}

module.exports = SpaceModule;
