"use strict";

var Server = function(configFilePath) {
	this.modulesConfig = new Object();
	this.twitter = null;

	var config = this.loadConfigFile(configFilePath);
	var validData = this.checkConfigData(config);

	if (!config || !validData) {
		process.exit(1);	
	}

	this.config = config;
	this.loadConfigData(config);
	this.initializeModules();
}

Server.prototype.loadConfigFile = function(configFilePath) {
	var fs = require('fs');
	
	try {
		var buffer = fs.readFileSync(configFilePath, "utf8");
		var config = JSON.parse(buffer);
		return config;
	} catch (e) {
		console.log("loadConfigFile -> " + e.toString());
	}
	return false;
}

Server.prototype.checkConfigData = function(config) {
	var isValid = true;

	if (config["tags"] == undefined || config["tags"].length <= 0) {
		isValid = false;	
	} else {
		for (var index = 0; index < config["tags"].length; ++index) {
		    var tag = config["tags"][index];

			if (tag.ModuleName == undefined || tag.ModuleTags == undefined) {
				isValid = false;
				break;
			}
		}
	}

	if (!isValid) {
		console.log("checkConfigData -> SyntaxError: Invalid config file format");
	}
	return isValid;
}	

Server.prototype.loadConfigData = function(config) {

	for (var index = 0; index < this.config["tags"].length; ++index) {
		var tag = this.config["tags"][index];
		var mConfig = this.loadConfigFile("./modules/" + tag.ModuleName + "/config.json");
		if (mConfig != undefined && mConfig != false) {
			mConfig.tags = tag.ModuleTags;
			this.modulesConfig[tag.ModuleName] = mConfig;
		}
	}
}

Server.prototype.initializeModules = function() {
	for (var moduleName in this.modulesConfig) {
		var moduleConfig = this.modulesConfig[moduleName];
		
		var moduleObject = require("./modules/" + moduleName + "/" + moduleConfig.objectFile);
		var moduleInstance = new moduleObject();
		this.modulesConfig[moduleName].moduleInstance = moduleInstance;
	}
}

Server.prototype.start = function() {
	var TwitterHook = require("./twitter.js");
	this.twitter = new TwitterHook();

	for (var moduleName in this.modulesConfig) {
		var moduleConfig = this.modulesConfig[moduleName];
		var tags = moduleConfig.tags;
		var onStreamFunc = moduleConfig.moduleInstance[moduleConfig.onStreamMethod];

		if (tags != undefined && moduleConfig.onStreamMethod != undefined && onStreamFunc != undefined) {
			this.twitter.hookStreamModule(tags, onStreamFunc);
		}
	}
}



module.exports = Server;
