const { doesNotThrow } = require("assert");
const net = require("net");
const port = 8080;
const server = new net.createServer();

server.listen(port, function () {
  console.log(
    `Server listening for connection requests on socket localhost:${port}`
  );
});

server.on("connection", function (socket) {
  console.log(
    `Time of establishing the connection: ${new Date().toUTCString()}`
  );
  console.log(`IP of the client: ${socket.remoteAddress}`);

  socket.on("data", function (chunk) {
    console.log(
      `Time of receiving data: ${new Date().toUTCString()}`
    );
    console.log(`Data: ${chunk}`);
    socket.write(chunk);
  });

  socket.on("end", function () {
    console.log(
      `Time of closing the connection: ${new Date().toUTCString()}`
    );
    console.log("Closing connection with the client");
  });

  socket.on("error", function (err) {
    console.log(`Error: ${err}`);
  });
});
