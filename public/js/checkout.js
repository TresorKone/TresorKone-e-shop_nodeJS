//stripe v2 to updated if necessary

Stripe.setPublicKey('pk_test_51MVsXsKZe2000scfWFmNN47psuiBZ54qd2ldGoUDmjEUmMHPu1dukdhgGMQILX1PAmlSrMe2CSC60NmoaO4PnwOl00HvqtjQY8');

let $form = $('#checkout-form');

$form.submit((e) => {
    $form.find('button').prop('disable', true);
    Stripe.card.createToken({
        number: $('#card-number').val(),
        cvc: $('#card-cvc').val(),
        exp_month: $('#card-expiry-month').val(),
        exp_year: $('#card-expiry-year').val(),
        name: $('#card-name').val()
    }, stripeResponseHandler);
    return false
});

const stripeResponseHandler = (status, response) => {

    if (response.error) { // error!
        //show the errors under the form
        $('#payment-errors').text(response.error.message);
        $('#payment-errors').removeClass('hidden');

        $form.find('button').prop('disabled', false);//re-enable submission

    } else {//Token was created!

        //Get the token ID
        let token = response.id;

        //Insert thr token into the form so it gets submitted to the server;
        $form.append($('<input type="hidden" name="stipeToken" />').val(token));

        //Submit the form
        $form.get(0).submit();

    }
}