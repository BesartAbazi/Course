// fetch-data.js
import axios from './axios';
import "regenerator-runtime/runtime.js";

export const fetchData = async () => {
    const rates = await axios.get('https://api.ratesapi.io/api/latest')
    return rates
}

export default fetchData;




// fetch-data.js (MOCK)
const fetchData = jest.fn(() => {
  return Promise.resolve({
    status: "Mock",
    data: {}
  });
});

export default fetchData;




// currency_comparison.js
import fetchData from './utils/fetch-data';
import "regenerator-runtime/runtime.js";

export default class CurrencyComparison {
	constructor(salary) {
		this.salary = salary
	}
	
	fetchCurrentExchange = async () => {
		return await fetchData().then(res => {
			return [res.data.rates, res.status]
		})
	}

	currencyConversion = (rates, currency) => {
		return +(rates[`${currency}`]).toFixed(2)
	}

	hourlyPayUSD = (exchangeRate) => {
		const usdSalaryEqual = 1/exchangeRate * this.salary
		const weeklySalary = usdSalaryEqual / 50 //assuming 50 work weeks a year
		return +(weeklySalary / 40).toFixed(2) //assuming 40 hour work weeks
	}

	response = (currency, exchangeRate, useData) => {
		const hourlyPayComparison = {
			salary: this.salary,
			USD: this.hourlyPayUSD(1)
		}
		hourlyPayComparison[`${currency}`] = this.hourlyPayUSD(exchangeRate)
		return useData(hourlyPayComparison, currency)
	}
}





// currency_comparison.test.js
import CurrencyComparison from './currency_comparison';

// Task 10: Import and mock fetchData
import fetchData from './utils/fetch-data.js';

const testSalary = new CurrencyComparison(50000)
jest.mock('./utils/fetch-data.js');
// Task 1: Create a test for testSalary.currencyConversion below
it ('returns exchange rate for USD', () => {
	// arrange
	const currencyCode1 = 'CAD'
	const expectedValue1 = 1.21
	const currencyCode2 = 'EUR'
	const expectedValue2 = .82
	const rates = {
		"MXN": 19.9021,
		"CAD": 1.2121, 
		"EUR": .8235	
	}

	// act
	const actualValue1 = testSalary.currencyConversion(rates, currencyCode1);
	const actualValue2 = testSalary.currencyConversion(rates, currencyCode2);

	// assert
	expect(expectedValue1).toBe(actualValue1);
	expect(expectedValue2).toBe(actualValue2);
})

// Task 5: Create a test for testSalary.hourlyPayUSD below
it ('returns the hourly pay in USD', () => {
	// arrage
	const onversionRateCAD = 1.2121;
	const expectedHourlyPay = 20.63;

	// act
	const actualHourlyPay = testSalary.hourlyPayUSD(onversionRateCAD);

	// assert
	expect(actualHourlyPay).toBe(expectedHourlyPay);
})


// Task 6: Complete this test!
it("Respond with different salaries based on currency", (done) => {
	//arrange
	const currency = "CAD"
	const exchangeRate = 1.21
	const expectedValue = {
		USD: 25,
		CAD: 20.66,
		salary: 50000,
	}

	//act
	testSalary.response(currency, exchangeRate, (result) => {
		//assert
		try{
			expect(result).toEqual(expectedValue);
			done();
		}
		catch(error){
			done(error);
		}
	})
})

// Task 10 & 11: Complete this test!
it("Receives current currency exchange data", async ()=>{
	//arrange
	const mockResponse = {
		status : "Mock",
		data: {
			"base": "USD",
			"rates": {
				"CCD": 50,
			},
			"date": "2021-05-17"
		}
	}
	const expectedValue = [{"CCD": 50}, "Mock"];

	// Mock the resolved value of fetchData
	fetchData.mockResolvedValueOnce(mockResponse);
	
	//act
	const actualValue = await testSalary.fetchCurrentExchange();
	
	//assert
	expect(actualValue).toEqual(expectedValue);
})
