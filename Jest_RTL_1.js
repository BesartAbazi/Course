/*
	There are a number of .getByX query methods to choose from, and they are all accessible as methods on the screen object. 
	Look at the example below, the .getByText() method is used to extract a DOM element with text that matches a specified string.
*/



import React, { useState } from "react";
import { AddThoughtForm } from "./AddThoughtForm";
import { Thought } from "./Thought";
import { generateId, getNewExpirationTime } from "./utilities";

export function App() {
	const [thoughts, setThoughts] = useState([
		{
			id: generateId(),
			text: "This is a place for your passing thoughts.",
			expiresAt: getNewExpirationTime(),
		},
		{
			id: generateId(),
			text: "They'll be removed after 15 seconds.",
			expiresAt: getNewExpirationTime(),
		},
	]);

	const addThought = (thought) => {
		setThoughts((thoughts) => [thought, ...thoughts]);
	};

	const removeThought = (thoughtIdToRemove) => {
		setThoughts((thoughts) =>
			thoughts.filter((thought) => thought.id !== thoughtIdToRemove)
		);
	};

	return (
		<div className="App">
			<header>
				<h1>Passing Thoughts</h1>
			</header>
			<main>
				<AddThoughtForm addThought={addThought} />
				<ul className="thoughts">
					{thoughts.map((thought) => (
						<Thought
							removeThought={removeThought}
							key={thought.id}
							thought={thought}
						/>
					))}
				</ul>
			</main>
		</div>
	);
}




import React, { useEffect } from "react";

export function Thought(props) {
	const { thought, removeThought } = props;

	const handleRemoveClick = () => {
		removeThought(thought.id);
	};

	useEffect(() => {
		const timesUp = setTimeout(() => {
			removeThought(thought.id);
		}, thought.expiresAt - Date.now());

		return () => {
			clearTimeout(timesUp);
		};
	}, [thought]);

	return (
		<li className="Thought">
			<button
				aria-label="Remove thought"
				className="remove-button"
				onClick={handleRemoveClick}
			>
				&times;
			</button>
			<div className="text">{thought.text}</div>
		</li>
	);
}





import React from "react";
import { Thought } from "./Thought.js";
import { App } from "./App.js";
import { render, screen } from "@testing-library/react";
// Import jest-dom here
import '@testing-library/jest-dom';


it("Should have header text Passing Thoughts", () => {
	render(<App />);
	// Test App header text here
	const header = screen.getByText('Passing Thoughts');

	// assert
	expect(header).toHaveTextContent('Passing Thoughts');
});


it("Should have button enabled", () => {
	render(<Thought thought={{ text: "Hello" }} removeThought={() => {}} />);
	// Test status of button here
	const button = screen.getByRole('button');
	expect(button).toBeEnabled();
});
