// Example 1:
		// File: converters.js
		// Export:
		function celsiusToFahrenheit(celsius) {
		  ...
		}
		module.exports.celsiusToFahrenheit = celsiusToFahrenheit;
		 
		module.exports.fahrenheitToCelsius = function(fahrenheit) {
		  ...
		};
		
		
		// Import:
		const converters = require('./converters.js');
	 
		const freezingPointC = 0;
		const boilingPointC = 100;
		 
		const freezingPointF = converters.celsiusToFahrenheit(freezingPointC);
		const boilingPointF = converters.celsiusToFahrenheit(boilingPointC);
	
	
	
	
// Example 2:
		// File: converters.js
		// Export:
		function celsiusToFahrenheit(celsius) {
		  return celsius * (9/5) + 32;
		}
		module.exports.celsiusToFahrenheit = celsiusToFahrenheit;
		 
		module.exports.fahrenheitToCelsius = function(fahrenheit) {
		  return (fahrenheit - 32) * (5/9);
		};
		
		
		// Import:
		const { celsiusToFahrenheit } = require('./converters.js');
	
	
	
	
// Example 3:
		// File: encryptors.js
		// Export:
		module.exports.caesarCipher = (str, amount = 0) => {
		  ...
		};


		module.exports.symbolCipher = str => {
		  ...
		}


		module.exports.reverseCipher = sentence => {
		  ...
		};
		
		
		// Import:
		const encryptors = require('./encryptors.js');
		const { caesarCipher, symbolCipher, reverseCipher } = encryptors;
		
		
		
		
// Example 4:
		// File: encryptors.js
		// Export:
		const shopForBeans = () => {
		  ...
		}

		let soakTheBeans = (beanType) => {
		   ...
		}

		let cookTheBeans = (isSoftened) => {
		  ...
		}
		
		module.exports = {shopForBeans, soakTheBeans, cookTheBeans};
		
		
		// Import:
		const {shopForBeans, soakTheBeans, cookTheBeans} = require('./library.js');
	
	
	
	
// Example 5:
		// File: encryptors.js
		// Export:
		module.exports.caesarCipher = (str, amount = 0) => {
		  ...
		};


		module.exports.symbolCipher = str => {
		  ...
		}


		module.exports.reverseCipher = sentence => {
		  ...
		};
		
		
		// Import:
		const { caesarCipher, symbolCipher, reverseCipher } = require('./encryptors.js');
	
	
	
	
// Example 6:
		// File: dom-functions.js
		const toggleHiddenElement = (domElement) => {
		    ...
		}
		 
		const changeToFunkyColor = (domElement) => {
		  ...
		}
		 
		export { toggleHiddenElement, changeToFunkyColor };
		
		
		// Import:
		import { toggleHiddenElement, changeToFunkyColor } from './dom-functions.js';
	
	
	
	
// Example 7:
		// File: greeterEspanol.js
		const greet = () => {
		  console.log('hola');
		}
		export { greet };
		 
		// File: greeterFrancais.js
		const greet = () => {
		  console.log('bonjour');
		}
		export { greet };
		
		
		// Import (with alias):
		import { greet as greetEspanol } from 'greeterEspanol.js';
		import { greet as greetFrancais } from 'greeterFrancais.js';
		
		
		
		
// Example 8:
		// File: dom-functions.js
		const toggleHiddenElement = (domElement) => {
		    ...
		}
		 
		const changeToFunkyColor = (domElement) => {
		  ...
		}
		 
		const resources = { 
		  toggleHiddenElement, 
		  changeToFunkyColor
		}
		
		export default resources;
		
		
		// Import (with alias):
		import domFunctions from '../modules/dom-functions.js';´
		const { toggleHiddenElement, changeToFunkyColor } = domFunctions;
		
		
		
		
// Example 9:
		// File: article-data.js
		const resources = {
		  articleTitle: "Implementing Modules using ES6 Syntax",
		  numberOfChallenges: 6,
		  minutesToComplete: 45
		}
		
		export default resources;
		
		
		// Import:
		import articleData from './article-data.js.js';
		import resources from './article-data.js.js';
		import { default articleData } from './article-data.js.js';