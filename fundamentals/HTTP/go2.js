// этот файл надо будет дописать...

// не обращайте на эту функцию внимания
// она нужна для того чтобы правильно читать входные данные
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

// вот эту функцию собственно надо написать
function parseTcpStringAsHttpRequest(string) {
  const rowsOfInput = string.split("\n");
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
console.log(JSON.stringify(http, undefined, 2));
