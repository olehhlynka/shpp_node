const net = require("net");
const port = 8080;
const host = "13.53.84.113";
const client = new net.Socket();
const textToSend = "Lorem ipsum dolor sit amet";

client.connect({ port: port, host: host }, function () {
  console.log(
    "TCP connection established with the server."
  );
  console.time("Total time");
  client.write(textToSend);
});

client.on("data", function (chunk) {
  console.log(
    `Data send to the server: ${textToSend}\nData received from the server: ${chunk.toString()}`
  );
  console.timeEnd("Total time");
  client.end();
});
