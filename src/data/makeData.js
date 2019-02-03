const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");

function getData(dir) {
  const arr = [];
  fs.readdirSync(dir).forEach(file => {
    const doc = yaml.safeLoad(fs.readFileSync(path.join(dir, file), "utf8"));
    const indentedJson = JSON.stringify(doc, null, 2);
    arr.push(JSON.parse(indentedJson));
  });
  return arr;
}

function createJson(name, data) {
  fs.writeFile(name, data, err => {
    if (err) {
      throw err;
    } else {
      console.log("The file has been saved!");
    }
  });
}

const gramDir = path.join(__dirname, "grammarTips");
const oneMinDir = path.join(__dirname, "oneMinuteTips");
const pronunDir = path.join(__dirname, "pronunciationTips");

const gramResult = getData(gramDir);
const oneMinResult = getData(oneMinDir);
const pronunResult = getData(pronunDir);

const totalResult = JSON.stringify(
  [...gramResult, ...oneMinResult, ...pronunResult],
  null,
  4
);

createJson("data.json", totalResult);
