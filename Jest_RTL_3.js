/*
	Querying Asynchronous Components
	
	We can use .findByX methods. The .findByX methods are used to query for asynchronous elements, which will eventually appear in the DOM. 
	The .findByX methods work by returning a Promise, which resolves when the queried element renders in the DOM. 
	As such, the async/await keywords can be used to enable asynchronous logic.
*/




// This library is imported to enable async/await keywords in the Codecademy Code Editor
import "regenerator-runtime/runtime";
import React from "react";
import { Thought } from "./Thought.js";
import { AddThoughtForm } from "./AddThoughtForm.js";
import { App } from "./App.js";
import { waitFor, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// This library is imported to mimic user interactions (which you'll learn about next!)
import userEvent from "@testing-library/user-event";

it("Should show new thought to be present", async () => {
	render(<App />);

	// The code below mimics a user posting a thought with text 'Oreos are delicious'
	const addThoughtInput = screen.getByRole("input");
	const addButton = screen.getByRole("submit");
	userEvent.type(addThoughtInput, "Oreos are delicious");
	userEvent.click(addButton);

	// Modify testing logic here
	const thought = await screen.findByText("Oreos are delicious");
	expect(thought).toBeInTheDocument();
});
