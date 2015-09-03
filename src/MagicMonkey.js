var Server = require("./server.js");
var configFile = process.argv[2]

if (configFile) {
	new Server(configFile).start();
}
