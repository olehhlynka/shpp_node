const http = require("http");

const data = "Lorem ipsum";

const options = {
  hostname: "localhost",
  port: 8000,
  path: "/path/to/resource",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": data.length,
  },
};

const req = http.request(options, (res) => {
  res.on("data", (d) => {
    console.timeEnd("Total time");
    process.stdout.write("Data received: " + d);
  });
});

req.on("error", (error) => {
  console.error(error);
});

console.time("Total time");
req.write(data);
req.end();
