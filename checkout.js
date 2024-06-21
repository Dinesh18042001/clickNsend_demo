import { loadStripe } from "@stripe/stripe-js";

export async function checkout({ lineItems }) {
    
    try {
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
        
        const { error } = await stripe.redirectToCheckout({
            mode: 'payment',
            lineItems,
            successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
            cancelUrl: window.location.origin
        });

        if (error) {
            throw new Error(error.message);
        }
    } catch (error) {
        console.error("Error during checkout:", error);
    }
}





// import { loadStripe } from "@stripe/stripe-js";

// export async function checkout({ lineItems }) {
//     try {
//         console.log('Starting checkout process...');
//         const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
//         console.log('Stripe publishable key:', publishableKey);

//         // Load Stripe instance with your publishable key
//         const stripe = await loadStripe(publishableKey);
//         console.log('Stripe instance loaded:', stripe);

//         if (!stripe) {
//             throw new Error("Failed to initialize Stripe");
//         }

//         // Log the structure of the stripe object
//         console.log('Stripe object structure:', stripe);

//         // Verify the existence of stripe.customers
//         if (!stripe || !stripe.customers) {
//             throw new Error("Stripe customers object is undefined");
//         }

//         // Create a customer (optional)
//         console.log('Creating customer...');
//         const customer = await stripe.customers.create({
//             name: 'Jenny Rosen',
//             address: {
//                 line1: '510 Townsend St',
//                 postal_code: '98140',
//                 city: 'San Francisco',
//                 state: 'CA',
//                 country: 'US',
//             },
//             email: 'Dinesh@gmail.com'
//         });
//         console.log('Customer created:', customer);

//         // Redirect to Checkout session with customer ID
//         const { error } = await stripe.redirectToCheckout({
//             customer: customer.id,
//             mode: 'payment',
//             lineItems,
//             successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
//             cancelUrl: window.location.origin
//         });

//         if (error) {
//             throw new Error(error.message);
//         }
//     } catch (error) {
//         console.error("Error during checkout:", error);
//         // Handle the error appropriately (e.g., show a message to the user)
//         // You might want to show an error message on the UI or trigger a different action based on the type of error.
//     }
// }
