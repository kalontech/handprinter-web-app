const fs = require("fs");
const path = require("path");

const envPath = path.join(__dirname, "..", "build", "env.js")

fs.appendFileSync(envPath, "window.env = {};\n");

for (const key in process.env) {
  if (key.startsWith("REACT_APP")) {
    fs.appendFileSync(envPath, `window.env.${key} = "${process.env[key]}";\n`);
  }
}
