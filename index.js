/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import { log } from "console";
import fs from "fs";
import inquirer from "inquirer";
import qr from "qr-image";

console.log("Hi, Let's create you QR Code!");

const questions = [
  {
    type: "list",
    name: "http",
    message: "HTTP or HTTPS?",
    choices: ["http", "https", "none"],
    default: "https",
    filter(val) {
      return val.toLowerCase();
    },
  },
  {
    type: "input",
    name: "URL",
    message: "URL? (www.google.com)",
  },
];

inquirer.prompt(questions).then((answers) => {
  var http = answers.http + "://";
  if (answers.http === "none") {
    http = "";
  }
  var domain = answers.URL;
  var URL = http + domain;
  var qr_png = qr.image(URL, { type: "png" });
  qr_png.pipe(fs.createWriteStream(domain + ".png"));

  fs.appendFile("URL.txt", "\n" + URL, function (err) {
    if (err) throw err;
    console.log("Saved!");
  });
});
