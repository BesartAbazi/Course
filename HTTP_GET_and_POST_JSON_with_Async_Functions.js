// Async funciton - GET

		// Information to reach API
		const dataMuseUrl = 'https://api.datamuse.com/words?';
		const queryParams = 'rel_jja=';

		// Selecting page elements
		const inputField = document.querySelector('#input');
		const submit = document.querySelector('#submit');
		const responseField = document.querySelector('#responseField');
		
		const renderWordResponse = (res) => {
		  // Handles if res is falsey
		  if(!res){
			console.log(res.status);
		  }
		  // In case res comes back as a blank array
		  if(!res.length){
			responseField.innerHTML = "<p>Try again!</p><p>There were no suggestions found!</p>";
			return;
		  }

		  // Creates an array to contain the HTML strings
		  let wordList = []
		  // Loops through the response and maxxing out at 10
		  for(let i = 0; i < Math.min(res.length, 10); i++){
			// Creates a list of words
			wordList.push(`<li>${res[i].word}</li>`);
		  }
		  // Joins the array of HTML strings into one string
		  wordList = wordList.join("");

		  // Manipulates responseField to render the modified response
		  responseField.innerHTML = `<p>You might be interested in:</p><ol>${wordList}</ol>`;
		  return;
		}

		// Asynchronous function
		// Code goes here
		const getSuggestions = async () => {
		  const wordQuery = inputField.value;
		  const endpoint = `${dataMuseUrl}${queryParams}${wordQuery}`;
		  try {
			const response = await fetch(endpoint, {cache: 'no-cache'});
			if(response.ok){
			  const jsonResponse = await response.json();
			  renderWordResponse(jsonResponse);
			}
		  } catch (error) {
			console.log(error);
		  }
		}

		// Clear previous results and display results to webpage
		const displaySuggestions = (event) => {
		  event.preventDefault();
		  while(responseField.firstChild){
			responseField.removeChild(responseField.firstChild);
		  }
		  getSuggestions();
		}

		submit.addEventListener('click', displaySuggestions);




// Async funciton - POST
		// information to reach API
		const apiKey = '<Your API Key>';
		const rebrandlyEndpoint = 'https://api.rebrandly.com/v1/links';

		// Some page elements
		const shortenButton = document.querySelector('#shorten');
		
		const renderWordResponse = (res) => {
		  // Handles if res is falsey
		  if(!res){
			console.log(res.status);
		  }
		  // In case res comes back as a blank array
		  if(!res.length){
			responseField.innerHTML = "<p>Try again!</p><p>There were no suggestions found!</p>";
			return;
		  }

		  // Creates an array to contain the HTML strings
		  let wordList = []
		  // Loops through the response and maxxing out at 10
		  for(let i = 0; i < Math.min(res.length, 10); i++){
			// Creates a list of words
			wordList.push(`<li>${res[i].word}</li>`);
		  }
		  // Joins the array of HTML strings into one string
		  wordList = wordList.join("");

		  // Manipulates responseField to render the modified response
		  responseField.innerHTML = `<p>You might be interested in:</p><ol>${wordList}</ol>`;
		  return;
		}

		// Asynchronous functions
		// Code goes here
		const shortenUrl = async () => {
			const urlToShorten = inputField.value;
			const data = JSON.stringify({destination: urlToShorten});
			try {
				const response = await fetch(rebrandlyEndpoint, {
					method: 'POST',
					body: data,
					headers: {
						'Content-type': 'application/json',
						'apikey': apiKey
					}
				});
				if(response.ok){
					const jsonResponse = await response.json();
					renderByteResponse(jsonResponse);
				}
			} 
			catch (error) {
				console.log(error);
			}
		}

		// Clear page and call Asynchronous functions
		const displayShortUrl = (event) => {
		  event.preventDefault();
		  while(responseField.firstChild){
			responseField.removeChild(responseField.firstChild);
		  }
		  shortenUrl();
		}

		shortenButton.addEventListener('click', displayShortUrl);