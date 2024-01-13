// Manage your variables with style: https://www.netlify.com/blog/2021/07/12/managing-environment-variables-from-your-terminal-with-netlify-cli/
const stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.handler = async (event, context) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                price_data: {
                    currency: "cad",
                    product_data: {
                        name: "Cake",
                    },
                    unit_amount: 2000,
                },
                quantity: 1,
            },
            {
                price_data: {
                    currency: "cad",
                    product_data: {
                        name: "whiskey",
                    },
                    unit_amount: 20000,
                },
                quantity: 1,
            },
            {
                price_data: {
                    currency: "cad",
                    product_data: {
                        name: "Pizza",
                    },
                    unit_amount: 2100,
                },
                quantity: 1,
            },
        ],
        mode: "payment",
        success_url: "https://serverless-payment.netlify.app/success",
        cancel_url: "https://serverless-payment.netlify.app/cancel",
    });

    return {
        statusCode: 200,
        body: JSON.stringify({
            id: session.id,
        }),
    };
};