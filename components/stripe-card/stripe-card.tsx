import { useMemo } from 'react';
import {
	CardElement,
	Elements,
	useElements,
	useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from 'components/common/button';

const StripeCard: React.FC<{ onCheckout: (token: string) => void }> = ({
	onCheckout,
}) => {
	const stripe = useStripe();
	const elements = useElements();

	const handleSubmit = async (event: any) => {
		// Block native form submission.
		event.preventDefault();

		if (!stripe || !elements) {
			// Stripe.js has not loaded yet. Make sure to disable
			// form submission until Stripe.js has loaded.
			return;
		}

		// Get a reference to a mounted CardElement. Elements knows how
		// to find your CardElement because there can only ever be one of
		// each type of element.
		const cardElement = elements.getElement(CardElement);

		if (cardElement) {
			try {
				const result = await stripe.createToken(cardElement);
				if (result.error) {
					console.log(result.error.message);
				} else {
					onCheckout(result.token.id);
				}
			} catch (error) {
				console.log(error);
			}
		}
	};

	const cardElementStyle = {
		base: {
			fontSize: '20px',
			fontWeight: '400',
			color: '#fff',
			fontFamily: '"Open Sans", Helvetica, Arial, sans-serif',
			fontSmoothing: 'antialiased',
			'::placeholder': {
				color: '#f0f0f0',
				textTransform: 'capitalize',
			},
		},
		invalid: {
			color: '#DF1E37',
		},
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="p-6 border rounded-10">
				<CardElement
					options={{
						style: cardElementStyle,
					}}
				/>
			</div>
			<div className="flex items-center justify-center my-12 w-full sm:px-12 md:mx-auto md:max-w-lg">
				<Button
					label="CONFIRM DONATION"
					size="large"
					type="submit"
					disabled={!stripe}
				/>
			</div>
		</form>
	);
};

const StripeComponent: React.FC<{
	apiKey: string;
	onCheckout: (token: string) => void;
}> = ({ apiKey, onCheckout }) => {
	const stripePromise = useMemo(() => {
		return loadStripe(apiKey);
	}, [apiKey]);

	return (
		<Elements stripe={stripePromise}>
			<StripeCard onCheckout={onCheckout} />
		</Elements>
	);
};

export default StripeComponent;
