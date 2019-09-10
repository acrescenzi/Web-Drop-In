const ayden = require('@adyen/api-library');
const express = require("express");
const app = express();

app.use(express.json());

app.use(express.static("public"));

const key = `AQEyhmfxK4zJbBZDw0m/n3Q5qf3VaY9UCJ1+XWZe9W27jmlZiniYHPZ+YtXG9dYfNdwN0H8QwV1bDb7kfNy1WIxIIkxgBw==-nCQAYXCDLBxkKi4jV00gwHVK4lW0QSO2hQ147e5MjjU=-be6y8IgE7z6Ltsx4`;
const merchantAccount = "TestAccountNY"
const client = new ayden.Client({apiKey: key, environment: 'TEST'});
const checkout = new ayden.CheckoutAPI(client);

app.post("/paymentMethods", (req, res, next) => {
    if (!req.body.amount || !req.body.countryCode || !req.body.amount.currency || !req.body.amount.value) {
        return next(new Error("Invalid details provided"));
    }
    // receives info from frontend
    /*
        {
            countryCode: "US",
            amount: {
                currency: "USD",
                value: 1000
            }
        }
    */
    checkout.paymentMethods({
        amount: req.body.amount,
        countryCode: req.body.countryCode,
        channel: "Web",
        merchantAccount
    }).then(data => res.json(data))
    .catch(err => next(err));
});

app.use((err, req, res, next) => {
    res.json({
        status: "error",
        message: err.message || "Unknown error"
    });
});

app.get("/", (req, res, next) => {
    res.send(__dirname + "/public/index.html");
});

app.listen(3000);








