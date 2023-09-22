/*
	The .queryByX methods return null if they don’t find a DOM node, unlike the .getByX methods, which throw an error and immediately cause the test to fail. 
	This is useful when asserting that an element is NOT present in the DOM.
*/




import React, { useState } from "react";
import { generateId, getNewExpirationTime } from "./utilities";

export function AddThoughtForm(props) {
	const [text, setText] = useState("");
	const handleTextChange = ({ target }) => {
		const { value } = target;
		setText(value);
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		if (text.length) {
			setTimeout(() => {
				const thought = {
					id: generateId(),
					text: text,
					expiresAt: getNewExpirationTime(),
				};
				props.addThought(thought);
				setText("");
			}, 500);
		}
	};
	return (
		<form onSubmit={handleSubmit} className="AddThoughtForm">
			<input
				type="text"
				role="input"
				aria-label="What's on your mind?"
				placeholder="What's on your mind?"
				value={text}
				onChange={handleTextChange}
			/>
			<input type="submit" role="submit" value="Add" />
		</form>
	);
}




import React from "react";
import { Thought } from "./Thought.js";
import { AddThoughtForm } from "./AddThoughtForm.js";
import { App } from "./App.js";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

it('"Oreos are delicious" should not appear', () => {
	render(<App />);
	// Add testing logic here
	const emptyThought = screen.queryByText('Oreos are delicious');
	expect(emptyThought).toBeNull();
});