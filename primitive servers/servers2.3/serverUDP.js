const UDP = require("dgram");
const server = UDP.createSocket("udp4");
const host = "0.0.0.0";
const port = 2222;

server.on("listening", () => {
  const address = server.address();

  console.log(
    "Listining to ",
    "Address: ",
    address.address,
    "Port: ",
    address.port
  );
});

server.on("message", (message, info) => {
  console.log(`IP of the client: ${info.address}`);
  console.log(`Data: ${message.toString()}`);
  console.log(
    `Time of receiving data: ${new Date().toUTCString()}`
  );

  server.send(message, info.port, info.address, (err) => {
    if (err) {
      console.error("Failed to send response !!");
    } else {
      console.log("Connection closed");
    }
  });
});

server.bind({ address: host, port: port, exclusive: true });
