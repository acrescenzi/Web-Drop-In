window.onload = function() {
    axios.post("http://localhost:3000/paymentMethods", {
        countryCode: "US",
        amount: {
            currency: "USD",
            value: 1000
        }
    })
    .then(response => {
        mountPaymentForm(response.data)
    })
    .catch(err => console.log(err.message));
}

function mountPaymentForm(paymentMethodsResponse) {
    const configuration = {
        locale: "en_US",
        environment: "test",
        originKey: "pub.v2.8115650120946270.aHR0cDovL2xvY2FsaG9zdDozMDAw.KlMY38Xu1nZtfysivH8kCK8qfh06rj-LY73wXnlWLsc",
        paymentMethodsResponse: paymentMethodsResponse
    };
    const checkout = new AdyenCheckout(configuration);

    const dropin = checkout
        .create('dropin', {
            onSubmit: (state, dropin) => {}
        })
        .mount('#dropin');
}





  