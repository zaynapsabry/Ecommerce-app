const router = require("express").Router();
const Stripe = require("stripe");
const stripe = Stripe(
  "sk_test_51N1AKdBUdZjHWua0Fay6xuoXDt7bm2xHgp0ILgGmgEUfxiijQ5pJhrbGD0zAAtEaYwR8Wg32JVchl2MHB6S0A5Nw00wDGMIOfp"
);

router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});
module.exports = router;
