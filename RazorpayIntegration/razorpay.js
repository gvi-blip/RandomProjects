const dotenv = require("dotenv");
const path = require("path");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const catchAsync = require("../../utilities/catchAsync"); //utility function not present in this folder or repo

dotenv.config({ path: path.resolve(__dirname, "config.env") });
const instance = new Razorpay({
  key_id: process.env.RPAY_KEY_ID,
  key_secret: process.env.RPAY_KEY_SECRET,
});

const getPaymentAmount = async (paymentId) => {
  try {
    //Get payment amount from instance method
    const paymentDetails = await instance.payments.fetch(paymentId);
    return paymentDetails.amount;
  } catch (err) {
    console.log(err);
  }
};
exports.createOrderId = catchAsync(async (req, res, next) => {
  //If amount is zero
  if (!req.body.amount || req.body.amount === 0) {
    res.status(400).send("Invalid amount");

    /*next(); 
    not working. My guess is that there needs to be a 
    next middleware function for next() to work*/
  } else {
    ///options object for rpay instance
    const options = {
      amount: req.body.amount * 100, // amount in the smallest currency unit
      currency: "INR",
      receipt: "order_rcptid_11",
    };

    //creating order id
    instance.orders.create(options, (err, order) => {
      console.log(order);
      res.status(200).json({
        status: "success",
        order_id: order.id,
      });
    });
  }
});

exports.confirmPaymentStatus = catchAsync(async (req, res, next) => {
  if ("error" in req.body) {
    //If key in object then Payment failed
    req.body.payment_status = false;
    req.body.amount = await getPaymentAmount(
      req.body.error.metadata.payment_id
    );
    // console.log(req.body.amount);
    // console.log('failed');
    //console.log(req.body.error.metadata.payment_id);
    next();
  } else {
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RPAY_KEY_SECRET)
      .update(`${req.body.razorpay_order_id}|${req.body.razorpay_payment_id}`)
      .digest("hex");
    if (generatedSignature === req.body.razorpay_signature) {
      //Payment Confirmed. Put amount on req body add to user Log in next middleware
      req.body.amount = await getPaymentAmount(req.body.razorpay_payment_id);
      req.payment_status = true;
      console.log(req.body.amount);
      console.log("success");
    }
    next();
  }
});
