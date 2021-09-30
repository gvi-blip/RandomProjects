const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");
(async () => {
  //const URL = "https://www.indikluster.com/shop";
  const URL = "https://www.marasim.in/all-products?page=4";
  const response = await axios.get(URL);
  const $ = cheerio.load(response.data);

  //for indkluster products
  // let products = [];
  // $("h3").each((index, element) => {
  //   console.log(index, element.children[0].data);
  //   products.push(element.children[0].data);
  // });
  // //For indkluster products
  // fs.writeFile(
  //   "./IndiklusterProducts.txt",
  //   ([...products] + "").split(",").join("\n"),
  //   (err) => {
  //     console.log("Added products to list");
  //   }

  //for marasim products
  let data = {
    brand: "Marasim",
    products: [],
  };
  $("._1bfj5").each((index, element) => {
    let product = {};
    product.name = element.children[0].children[0].data; // product names
    if (element.children[1].children[0].data === "Out of stock") {
      //console.log(element.children[1].children[0].data); // product availability
      product.availability = "Out of stock";
      product.price = null;
    } else {
      product.availability = "Available";
      product.price =
        element.children[1].children[0].parent.children[1].children[0].data;
    }
    data.products.push(product);
  });

  //For marasim products
  fs.writeFile("./marasimProducts.json", JSON.stringify(data), (err) => {
    console.log("Added products to list");
  });
})();
