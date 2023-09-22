import {
    capitalize,
    getAlpha2Code,
    countryExtractor,
    countryListLookup,
    getResponseimport {
        capitalize,
        getAlpha2Code,
        countryExtractor,
        countryListLookup,
        getResponse
    } from "./language_spoken.js";

it("converts array of country data objects to array of countries", () => {
    //arrange
    const inputObject = [
        { name: "Argentina", capital: "Buenos Aires" },
        { name: "Belize", capital: "Belmopan" },
        { name: "Bolivia", capital: "Sucre" }
    ]
    const expectedValue = ["Argentina", "Belize", "Bolivia"];

    //act
    const actualValue = countryExtractor(inputObject);

    //assertions
    expect(actualValue).toEqual(expectedValue);
    expect(actualValue[0]).toBe("Argentina");
    expect(actualValue).toContain("Belize");
    expect(actualValue[2] === "Bolivia").toBeTruthy();
    expect(actualValue[3]).not.toBeDefined();
});

it("correctly fetches a list of countries", async () => {

    const inputLanguageCode = "es";
    const expectedValue = "Argentina";

    const actualValue = await countryListLookup(inputLanguageCode);

    expect(actualValue).toContain(expectedValue);
});

  } from "./language_spoken.js";

it("converts array of country data objects to array of countries", () => {
    //arrange
    const inputObject = [
        { name: "Argentina", capital: "Buenos Aires" },
        { name: "Belize", capital: "Belmopan" },
        { name: "Bolivia", capital: "Sucre" }
    ]
    const expectedValue = ["Argentina", "Belize", "Bolivia"];

    //act
    const actualValue = countryExtractor(inputObject);

    //assertions
    expect(actualValue).toEqual(expectedValue);
    expect(actualValue[0]).toBe("Argentina");
    expect(actualValue).toContain("Belize");
    expect(actualValue[2] === "Bolivia").toBeTruthy();
    expect(actualValue[3]).not.toBeDefined();
});

it("correctly fetches a list of countries", async () => {

    const inputLanguageCode = "es";
    const expectedValue = "Argentina";

    const actualValue = await countryListLookup(inputLanguageCode);

    expect(actualValue).toContain(expectedValue);
});
