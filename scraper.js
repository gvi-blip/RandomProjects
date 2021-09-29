const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");
(async () => {
  const response = await axios.get("https://www.indikluster.com/shop");
  const $ = cheerio.load(response.data);
  $("h3").each((index, element) => {
    console.log(index, element.children);
  });
})();
