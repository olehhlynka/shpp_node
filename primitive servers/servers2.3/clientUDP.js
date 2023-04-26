const UDP = require("dgram");
const client = UDP.createSocket("udp4");
const port = 2222;
const hostname = "13.53.84.113";
const textToSend = "Lorem ipsum dolor sit amet";

client.on("message", (message) => {
  console.timeEnd("Total time");
  console.log(
    `Data send to the server: ${textToSend}\nData received from the server: ${message.toString()}`
  );
  client.close();
});

const packet = Buffer.from(textToSend);

client.send(packet, port, hostname, (err) => {
  console.time("Total time");
  if (err) {
    console.error("Failed to send packet !!");
  }
});
