const express = require('express');
const app = express();
const { seedElements } = require('./utils');

// Serves Express Yourself website
app.use(express.static('public'));

const PORT = process.env.PORT || 4001;

const expressions = [];
seedElements(expressions, 'expressions');

// Get all expressions
app.get('/expressions', (req, res, next) => {
	res.send(expressions);
});

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});


--> Browser: localhost:4001/expressions







// utils.js

let expressionIdCounter = 0;
let animalIdCounter = 0;

const getElementById = (id, elementList) => {
	return elementList.find((element) => {
		return element.id === Number(id);
	});
};

const getIndexById = (id, elementList) => {
	return elementList.findIndex((element) => {
		return element.id === Number(id);
	});
};

const createElement = (elementType, queryArguments) => {
	if (queryArguments.hasOwnProperty('emoji') && queryArguments.hasOwnProperty('name')) {
		let currentId;
		if (elementType === 'expressions') {
			expressionIdCounter += 1;
			currentId = expressionIdCounter;
		} else {
			animalIdCounter += 1;
			currentId = animalIdCounter;
		}
		return {
			'id':		currentId,
			'emoji': queryArguments.emoji,
			'name':	queryArguments.name,
		};
	} else {
		return false;
	}
};

const updateElement = (id, queryArguments, elementList) => {
	const elementIndex = getIndexById(id, elementList);
	if (elementIndex === -1) {
		throw new Error('updateElement must be called with a valid id parameter');
	}
	if (queryArguments.id) {
		queryArguments.id = Number(queryArguments.id);
	}
	Object.assign(elementList[elementIndex], queryArguments);
	return elementList[elementIndex];
};

const seedElements = (arr, type) => {
	if (type === 'expressions') {
		arr.push(createElement('expressions', {'emoji': '😀', 'name': 'happy'}));
		arr.push(createElement('expressions', {'emoji': '😎', 'name': 'shades'}));
		arr.push(createElement('expressions', {'emoji': '😴', 'name': 'sleepy'}));
	} else if (type === 'animals') {
		arr.push(createElement('animals', {'emoji': '🐶', 'name': 'Pupper'}));
		arr.push(createElement('animals', {'emoji': '🐍', 'name': 'Snek'}));
		arr.push(createElement('animals', {'emoji': '🐱', 'name': 'Maru'}));
	} else {
		throw new Error(`seed type must be either 'expression' or 'animal'`);
	}
};

module.exports = {
	createElement: createElement,
	getIndexById: getIndexById,
	getElementById: getElementById,
	updateElement: updateElement,
	seedElements: seedElements,
};
