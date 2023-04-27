const http = require("http");

const host = "localhost";
const port = 8000;

const requestListener = function (req, res) {
  console.log(
    `Time of establishing the connection: ${new Date().toUTCString()}`
  );
  console.log(`Ip: ${req.socket.remoteAddress}`);
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    console.log(
      `Time of receiving data: ${new Date().toUTCString()}`
    );
    console.log("Data: ", body);
    res.writeHead(200);
    res.end(body);
    console.log("Closing connection with the client");
  });
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(
    `Server is running on http://${host}:${port}`
  );
});
