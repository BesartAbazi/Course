const express = require('express');
const app = express();

// Serves Express Yourself website
app.use(express.static('public'));

const { getElementById, getIndexById, updateElement,
				seedElements, createElement } = require('./utils');

const expressions = [];
seedElements(expressions, 'expressions');

const PORT = process.env.PORT || 4001;

app.get('/expressions', (req, res, next) => {
	res.send(expressions);
});

app.get('/expressions/:id', (req, res, next) => {
	const foundExpression = getElementById(req.params.id, expressions);
	if (foundExpression) {
		res.send(foundExpression);
	} else {
		res.status(404).send();
	}
});

app.put('/expressions/:id', (req, res, next) => {
	const expressionIndex = getIndexById(req.params.id, expressions);
	if (expressionIndex !== -1) {
		updateElement(req.params.id, req.query, expressions);
		res.send(expressions[expressionIndex]);
	} else {
		res.status(404).send();
	}
});

app.post('/expressions', (req, res, next) => {
	const receivedExpression = createElement('expressions', req.query);
	if (receivedExpression) {
		expressions.push(receivedExpression);
		res.status(201).send(receivedExpression);
	} else {
		res.status(400).send();
	}
});

// Add your DELETE handler below:
app.delete('/expressions/:id', (req, res, next) => {
	const expressionIndex = getIndexById(req.params.id, expressions);
	if (expressionIndex !== -1) {
		expressions.splice(expressionIndex, 1);
		res.status(204).send();
	}
	else{
		res.status(404).send();
	}
})

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});








// util.js
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
	if (queryArguments.hasOwnProperty('emoji') &&
			queryArguments.hasOwnProperty('name')) {
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
