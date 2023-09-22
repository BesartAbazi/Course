/*
	Testing for Accessibility
	
	One of the guiding principles of React Testing Library is to write “queries that reflect the experience of visual/mouse users as well as those that use assistive technology.” 
	Usually, this means using the same text that the user would see, rather than the implementation details like class names or IDs.

	Writing tests that adhere to this principle forces you to make your applications more accessible. 
	If a test can find and interact with your elements by their text, it’s more likely that a user who uses assistive technology can as well.

	One way we can write tests with accessibility concerns in mind is by sticking to querying with ByRole queries (getByRole, findByRole, queryByRole). 
	The ByRole variant will be able to query any elements within the accessibility tree. 
	If you are unable to query for the component you want to test, you may have just exposed a part of your application that is inaccessible.
*/




import React, { useState } from "react";

const CheckoutForm = () => {
	const [formState, setFormState] = useState({
		name: "",
		email: "",
		address: "",
		payment: "Credit Card",
	});

	const handleChange = (e) => {
		setFormState({ ...formState, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formState);
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="name">
					Name:
				</label>
				<input id="name" name="name" type="text" onChange={handleChange} />
			</div>
			<div>
				<label htmlFor="email">
					Email:
				</label>
				<input id="email" name="email" type="email" onChange={handleChange} />
			</div>
			<div>
				<label htmlFor="address">
					Address:
				</label>
				<input
					id="address"
					name="address"
					type="text"
					onChange={handleChange}
				/>
			</div>
			<div>
				<label htmlFor="payment">
					Payment Method:
				</label>
				<select id="payment" name="payment" onChange={handleChange}>
					<option>Credit Card</option>
					<option>Debit Card</option>
					<option>PayPal</option>
				</select>
			</div>
			<div>
				<button type="submit">Checkout</button>
			</div>
		</form>
	);
};

export default CheckoutForm;




import { render, screen } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

it("finds form fields and checkout button", () => {
	render(<CheckoutForm />);
	//Put your test logic below!
	screen.getByRole('textbox', { name: /name/i });
	screen.getByRole('textbox', { name: /email/i });
	screen.getByRole('textbox', { name: /address/i });
	screen.getByRole('combobox', { name: /payment method/i });
	screen.getByRole('button', { name: /checkout/i });
});

