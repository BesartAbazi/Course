/*
	The waitFor() method
	
	What about components that disappear asynchronously?
	RTL provides another function that can be used for asynchronous testing that will be perfect for this scenario - the waitFor() function. 
	In order to use this function, we need to import it from @testing-library/react
	As with the other async functions, the waitFor() function returns a Promise, so we have to preface its call with the await keyword. 
	It takes a callback function as an argument where we can make asynchronous function calls, perform queries, and/or run assertions.
*/




import "regenerator-runtime/runtime";
import React from "react";
import { App } from "./App.js";
// Import waitFor below
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

it("Should show Thought to be removed", async () => {
	render(<App />);
	const input = screen.getByRole("input");
	const submit = screen.getByRole("submit");
	userEvent.type(input, "I have to call my mom.");
	userEvent.click(submit);

	//Write your test logic here!
	await waitFor(() => {
		const thought = screen.queryByText('I have to call my mom.');
		expect(thought).toBeNull();
	})
});

