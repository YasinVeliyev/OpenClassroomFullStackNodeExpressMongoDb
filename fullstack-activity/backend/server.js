const http = require("node:http");
const app = require("./app");

let server = http.createServer(app);

server.listen(process.env.PORT || 5000);
