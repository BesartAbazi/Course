/*
    Code duplication is an invitation for bugs. If incorrect code is copy-and-pasted in multiple places, a developer might remedy the flaws in only a few of those places and fail to fix the buggy code everywhere. 
    In this course, we will investigate several ways to avoid replication and reduce complexity. In programming in general, this often means putting the reused code into reusable containers like functions and objects. 
    In Express specifically, this will also mean composing our desired functionality into a series of middleware functions.

    morgan:
    -------
    Logging middleware.
    Morgan takes an argument to describe the formatting of the logging output
    With morgan in place, we’ll be able to remove the existing logging code.
    Once we see how fast it is to add logging with morgan, we won’t have to spend time in the future trying to figure out how to replicate that functionality.
    morgan('tiny') will return a middleware function that does a “tiny” amount of logging. See other parameter beside "tiny" in the morgan documentaion.

    body-parser:
    ------------
    body-parser is a Node.js body parsing middleware.
    body-parser will automatically attach the parsed body object to req.body
    bodyParser.json(): Parse all request bodies in JSON format.

    errorhandler:
    -------------
    Error catching middleware.
    Express has its own error-handler, which catches errors that we haven’t handled. But if we anticipate an operation might fail, we can invoke our error-handling middleware. We do this by passing an error object as an argument to next().
    Usually, next() is called without arguments and will proceed through the middleware stack as expected. When called with an error as the first argument, however, it will call any applicable error-handling middleware.
*/


const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
app.use(express.static('public'));

const PORT = process.env.PORT || 4001;

const cards = [
    {
        id: 1,
        suit: 'Clubs',
        rank: '2'
    },
    {
        id: 2,
        suit: 'Diamonds',
        rank: 'Jack'
    },
    {
        id: 3,
        suit: 'Hearts',
        rank: '10'
    }
];
let nextId = 4;

// Logging Middleware
if (!process.env.IS_TEST_ENV) {
    app.use(morgan('short'));
}

// Parsing
app.use(bodyParser.json());

// Middleware for all routes with the path '/cards/:cardId'
app.use('/cards/:cardId', (req, res, next) => {
    const cardId = Number(req.params.cardId);
    const cardIndex = cards.findIndex(card => card.id === cardId);
    if (cardIndex === -1) {
        return res.status(404).send('Card not found');
    }
    req.cardIndex = cardIndex;
    next();
});

// Middleware for POST and PUT
const validateCard = (req, res, next) => {
    const newCard = req.body;
    const validSuits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
    const validRanks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
    if (validSuits.indexOf(newCard.suit) === -1 || validRanks.indexOf(newCard.rank) === -1) {
        return res.status(400).send('Invalid card!');
    }
    req.newCard = newCard;
    next();
};


// Get all Cards
app.get('/cards/', (req, res, next) => {
    res.send(cards);
});

// Get a single Card
app.get('/cards/:cardId', (req, res, next) => {
    res.send(cards[req.cardIndex]);
});

// Create a new Card
app.post('/cards/', validateCard, (req, res, next) => {
    req.newCard.id = nextId++;
    cards.push(req.newCard);
    res.status(201).send(req.newCard);
});

// Update a Card
app.put('/cards/:cardId', validateCard, (req, res, next) => {
    const cardId = Number(req.params.cardId);
    if (!req.newCard.id || req.newCard.id !== cardId) {
        req.newCard.id = cardId;
    }
    cards[req.cardIndex] = req.newCard;
    res.send(req.newCard);
});

// Delete a Card
app.delete('/cards/:cardId', (req, res, next) => {
    cards.splice(req.cardIndex, 1);
    res.status(204).send();
});

// Error handler middleware (has to be at last before app.listen)
app.use(errorHandler());

// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
