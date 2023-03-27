const { listenerCount } = require("events");

function readHttpLikeInput() {
  var fs = require("fs");
  var res = "";
  var buffer = Buffer.alloc
    ? Buffer.alloc(1)
    : new Buffer(1);
  let was10 = 0;
  for (;;) {
    try {
      fs.readSync(0 /*stdin fd*/, buffer, 0, 1);
    } catch (e) {
      break; /* windows */
    }
    if (buffer[0] === 10 || buffer[0] === 13) {
      if (was10 > 10) break;
      was10++;
    } else was10 = 0;
    res += new String(buffer);
  }

  return res;
}

let contents = readHttpLikeInput();

function outputHttpResponse(
  statusCode,
  statusMessage,
  headers,
  body
) {
  let response = `HTTP/1.1 ${statusCode} ${statusMessage}\n`;
  for (const [key, value] of Object.entries(headers)) {
    response += `${key}: ${value}\n`;
  }
  response += `\n${body}`;
  console.log(response);
}

function processHttpRequest(
  $method,
  $uri,
  $headers,
  $body
) {
  const responses = {
    200: "OK",
    400: "Bad Request",
    404: "Not Found",
    500: "Internal Server Error",
  };
  const headers = {
    Date: null,
    Server: "Apache/2.2.14 (Win32)",
    "Content-Length": null,
    Connection: "Closed",
    "Content-Type": "text/html; charset=utf-8",
  };
  pathToFile = ".\\";
  if (
    $headers["Host"] !== "student.shpp.me" &&
    $headers["Host"] !== "another.shpp.me"
  ) {
    headers["Date"] = new Date().toUTCString();
    headers["Content-Length"] = responses[404].length;
    outputHttpResponse(
      404,
      responses[404],
      headers,
      responses[404].toLowerCase()
    );
    return;
  }
  pathToFile +=
    $headers["Host"] === "student.shpp.me"
      ? "student\\"
      : "";
  pathToFile +=
    $headers["Host"] === "another.shpp.me"
      ? "another\\"
      : "";
  pathToFile +=
    $uri === "/"
      ? "index.html"
      : $uri.replaceAll("/", "\\");
  try {
    const file = require("fs").readFileSync(pathToFile);
    headers["Date"] = new Date().toUTCString();
    headers["Content-Length"] = file.length;
    outputHttpResponse(
      "200",
      responses[200],
      headers,
      file
    );
  } catch (error) {
    headers["Date"] = new Date().toUTCString();
    headers["Content-Length"] = responses[404].length;
    outputHttpResponse(
      404,
      responses[404],
      headers,
      responses[404].toLowerCase()
    );
  }
}

function parseTcpStringAsHttpRequest($string) {
  const rowsOfInput = $string.split("\n");
  const headers = {};
  const rowsOfHeaders = rowsOfInput.slice(
    1,
    rowsOfInput.indexOf("")
  );
  for (const header of rowsOfHeaders) {
    headers[header.substring(0, header.indexOf(":"))] =
      header.substring(header.indexOf(" ") + 1);
  }
  return {
    method: rowsOfInput[0].split(" ")[0],
    uri: rowsOfInput[0].split(" ")[1],
    headers: headers,
    body: rowsOfInput[rowsOfInput.indexOf("") + 1],
  };
}

http = parseTcpStringAsHttpRequest(contents);
processHttpRequest(
  http.method,
  http.uri,
  http.headers,
  http.body
);
