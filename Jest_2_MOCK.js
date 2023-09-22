// function httpRequest
import axios from "axios"
import "regenerator-runtime/runtime.js";

const httpRequest = async (alpha2Code) => {
	const result = await axios.get(`https://restcountries.com/v2/lang/${alpha2Code}`)
	if (result.status) {
			console.log(`REST API call status: ${result.status}`)
	}
	return result
}

export default httpRequest;




// MOCK version of function httpRequest
const httpRequest = jest.fn(() => {
	return Promise.resolve({
		status: "", 
		data:{}
	});
})

export default httpRequest;




import {
	capitalize,
	getAlpha2Code,
	countryExtractor,
	countryListLookup,
	getResponse
} from "./language_spoken.js";

// TODO: Import and mock httpRequest
import httpRequest from './utils/http-request.js';
jest.mock('./utils/http-request.js');

it("converts array of country data objects to array of countries", () => {
	//arrange
	const inputObject = [
		{name: "Argentina", capital: "Buenos Aires"},
		{name: "Belize", capital: "Belmopan"},
		{name: "Bolivia", capital: "Sucre"}
	];
	const expectedValue = ["Argentina","Belize","Bolivia"];
	
	//act
	const actualValue = countryExtractor(inputObject);
	
	//assert
	expect(actualValue).toEqual(expectedValue);
	expect(actualValue[0]).toBe("Argentina");
	expect(actualValue).toContain("Belize");
	expect(actualValue[2] === "Bolivia").toBeTruthy();
	expect(actualValue[3]).not.toBeDefined();
});

it("correctly fetches a list of countries",	async () => {
	//arrange
	const inputLanguageCode = "jest";
	const expectedValue ="CodeLand";
	const resolvedValue = {
		status: 'MOCK',
		data: [
			{ name: "CodeLand", capital: "Codecademy" },
		]
	};
	httpRequest.mockResolvedValueOnce(resolvedValue);

	//act
	const actualValue = await countryListLookup(inputLanguageCode);
	//assert
	expect(actualValue).toContain(expectedValue);
});