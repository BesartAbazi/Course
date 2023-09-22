import React from "react";
import PropTypes from "prop-types";
import { styles } from "../styles";

const images = {
	copycat:
		"https://content.codecademy.com/courses/React/react_photo_copycat.png",
	quietcat:
		"https://content.codecademy.com/courses/React/react_photo_quietcat.png",
};

export const CopyCat = ({
	name,
	value,
	handleChange,
	isCopying,
	toggleTape,
}) => {
	return (
		<div style={styles.divStyles}>
			<h1 style={{ marginBottom: 80 }}>Copy Cat {name || "Tom"}</h1>
			<label htmlFor="copy-input"></label>
			<input
				id="copy-input"
				type="text"
				value={value}
				onChange={handleChange}
			/>
			<button>
				<img
					role="button"
					alt={isCopying ? "copycat" : "quietcat"}
					src={isCopying ? images.copycat : images.quietcat}
					style={styles.imgStyles}
					onClick={toggleTape}
					data-testid="cat-image"
				/>
			</button>
			<p data-testid="copied-text">{isCopying && value}</p>
		</div>
	);
};





import React, { useState, useEffect } from "react";
import { CopyCat } from "../components/CopyCat";

export const CopyCatContainer = () => {
	const [isCopying, setIsCopying] = useState(true);
	const [input, setInput] = useState("");

	const handleChange = (e) => {
		const value = e.target.value;
		setInput(value);
	};

	const toggleTape = () => {
		setIsCopying(!isCopying);
	};

	return (
		<CopyCat
			value={input}
			isCopying={isCopying}
			handleChange={handleChange}
			toggleTape={toggleTape}
			data-testid="copied-text"
		/>
	);
};





import { CopyCat } from "./CopyCat";
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

it("Displays the provided name", () => {
	render(
		<CopyCat
			name="Mack"
			value=""
			handleChange={() => {}}
			toggleTape={() => {}}
			isCopying={true}
		/>
	);

	// act
	const copyCatName = screen.getByRole("heading");
	const expectedValue = "Copy Cat Mack";

	// assert
	expect(copyCatName).toHaveTextContent(expectedValue);
});

it("Should display input text in paragraph when isCopying is set to true", () => {
	render(
		<CopyCat
			name="Mack"
			value="Here is an input"
			handleChange={() => {}}
			toggleTape={() => {}}
			isCopying={true}
		/>
	);

	// act
	const valueInput = screen.getByRole('textbox', { id: 'copy-input' });
	const valueParagraph = screen.getByText('Here is an input');

	// assert
	expect(valueInput).toHaveValue('Here is an input');
	expect(valueParagraph).toBeInTheDocument();
});

it("Should not display input text in paragraph when isCopying is set to false", () => {
	render(
		<CopyCat
			name="Mack"
			value="Here is an input"
			handleChange={() => {}}
			toggleTape={() => {}}
			isCopying={false}
		/>
	);

	// act
	const valueInput = screen.getByRole('textbox', { id: 'copy-input' });
	const valueParagraph = screen.queryByText('Here is an input');

	// assert
	expect(valueInput).toHaveValue('Here is an input');
	expect(valueParagraph).not.toBeInTheDocument();
});






import { CopyCatContainer } from "./CopyCatContainer";
import "regenerator-runtime";
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

it("Should display copied text", async () => {
	render(<CopyCatContainer/>);

	// act
	const valueToTest = 'Hello World!';
	const input = screen.getByRole('textbox');
	userEvent.type(input, valueToTest);

	// assert
	const expected = await screen.findByText(valueToTest);
	expect(expected).toBeInTheDocument();
});

it("Should remove copied text after putting on tape", async () => {
	render(<CopyCatContainer/>);

	// act
	const valueToTest = 'My mouth is shut';
	const input = screen.getByRole('textbox');
	userEvent.type(input, valueToTest);

	// assert
	const expected = await screen.findByText(valueToTest);
	expect(expected).toBeInTheDocument();

	// act
	const button = screen.getByRole('button', { name: 'copycat' });
	userEvent.click(button);

	// assert
	await waitFor(() => {
		const expectedImage = screen.queryByText('My mouth is shut');
		expect(expectedImage).not.toBeInTheDocument();
	})
});

it("Should display copied text after removing tape", async () => {
	render(<CopyCatContainer/>);

	// act
	const valueToTest = 'Eventually this will appear';
	const input = screen.getByRole('textbox');
	await userEvent.type(input, valueToTest);

	const copyCatImage = screen.getByRole('button', { name: 'copycat' });
	await userEvent.click(copyCatImage);
	
	const quietCatImage = screen.getByRole('button', { name: 'quietcat' });
	userEvent.click(quietCatImage);	

	const expected = await screen.findByText(valueToTest);
	expect(expected).toBeInTheDocument();
});

