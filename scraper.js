const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");
(async () => {
  const URL = "https://www.indikluster.com/shop";
  const response = await axios.get("https://www.indikluster.com/shop");
  const $ = cheerio.load(response.data);
  let products = [];
  $("h3").each((index, element) => {//for indkluster products
    console.log(index, element.children[0].data);
    products.push(element.children[0].data);
  });
  //For indkluster products
  fs.writeFile(
    "./IndiklusterProducts.txt",
    ([...products] + "").split(",").join("\n"),
    (err) => {
      console.log("Added products to list");
    }
    
    let products = [];
    $("h3").each((index, element) => {//for marasim products
      console.log(index, element.children[0].data);
      products.push(element.children[0].data);
    });
    //For marasim products
  fs.writeFile(
    "./IndiklusterProducts.txt",
    ([...products] + "").split(",").join("\n"),
    (err) => {
      console.log("Added products to list");
    }
  );
})();
