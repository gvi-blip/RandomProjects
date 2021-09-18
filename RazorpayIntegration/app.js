const express = require("express");
const app = express();
const router = express.Router();
const razorpay = require("./razorpay");
const port = 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
app.get("/addtowallet", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});
app.post("/getorderid", razorpay.createOrderId);
app.post("/confirmpayment", razorpay.confirmPaymentStatus); //Add update userwallet balance middleware after this
