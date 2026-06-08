import Stripe from "stripe";


export default async function checkout(req, res) {

    if (req.method !== 'POST') {
        return res.status(405).json({ erro: 'Não permitido' })
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const { produto, preco } = req.body;


    if (typeof req.body === 'string') {
        req.body = JSON.parse(req.body)
    }

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'brl',
                        product_data: {
                            name: produto,
                        },
                        unit_amount: Math.round(Number(preco) * 100)
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'http://localhost:3000/sucesso',
            cancel_url: 'http://localhost:3000/cancelado',
        });

        return res.status(200).json({ url: session.url })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ erro: error.message });
    }
}