var Server = require("./server.js");
var configFile = process.argv[2]

if (configFile) {
	var serv = new Server(configFile);
	serv.start();
	console.log("done");
}
