const fs = require("fs");

const data = fs.readFileSync("session-storage.txt", "utf-8");
const parsedData = JSON.parse(data);
let obj = {};
for (const [key, value] of Object.entries(parsedData))
  obj = {
    ...obj,
    [key]: JSON.stringify(value)
  };
const cis2 = JSON.stringify(obj);
fs.writeFileSync("cis2.txt", btoa(cis2), "utf-8");