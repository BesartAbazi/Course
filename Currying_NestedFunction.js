// Normal function structure:
		function curriedMultiply(a) {
		   return function(b) {
			   return a * b
		   }
		}
		
		// Write your code here
		const nestedFunction = curriedMultiply(2);
		
			const nestedFunction = curriedMultiply(2);
			const result = nestedFunction(4);
			OR (faster):
			const result = curriedMultiply(2)(4);

		console.log(result);
		
		
		
		
// Arrow function structure:
		// Example 1:
			let curriedMultiply = a => b => a * b;
			console.log(curriedMultiply(2)(4));
			
			
			
			
		// Example 2:
			let array = [
			  {name: 'A', age: 2}, 
			  {name: 'B', age: 8},
			  {name: 'C', age: 4},
			  {name: 'D', age: 12},
			  {name: 'E', age: 8}
			]
			
			// Arrow function for filtering
			const setFilter2 = array => key => value => array.filter(x => x[key] === value);
			
			const newArray = setFilter2(array)('age')(8)			// first filter by age -> age = 8: 2 results
			const finalArray = setFilter2(newArray)('name')('B')	// second filter by name -> name = B: 1 result (final)
			console.log(finalArray)
			
			
			
			
		// Example 3:
			let array = [
			  {name: 'A', age: 2}, 
			  {name: 'B', age: 8},
			  {name: 'C', age: 4},
			  {name: 'D', age: 12},
			  {name: 'E', age: 8}
			]

			const setFilter2 = array => key => value => array.filter(x => x[key] === value);

			let newArray = setFilter2(array)('age')(8)				// first filter by age -> age = 8: 2 results
			newArray = setFilter2(newArray)('name')('B').sort((a, b) => { return a.age - b.age}) // second filter by name -> name = B: 1 result (final) and sorting