/*
    router.param()
    When a specific parameter is present in a route, we can write a function that will perform the necessary lookup and attach it to the req object in subsequent middleware that is run.
    -> See app.param()

    router.param is a powerful tool that we can use to keep our code from repeating core functionality through routes. 
    This is a pattern we want to frequently follow: identify multiple pieces of code that accomplish the same goal, put it into a single component, let that component do that thing (and update it when we want the thing it does to change — in a single place).
*/

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static('public'));

const PORT = process.env.PORT || 4001;

const spiceRack = [
    {
        id: 1,
        name: 'cardamom',
        grams: 45,
    },
    {
        id: 2,
        name: 'pimento',
        grams: 20,
    },
    {
        id: 3,
        name: 'cumin',
        grams: 450,
    },
    {
        id: 4,
        name: 'sichuan peppercorns',
        grams: 107,
    }
];

let nextSpiceId = 5;

app.use(bodyParser.json());

// App.param middleware: Perform the necessary lookup everytime the route '/spices/:spiceId' is executed and attach it to the req object
app.param('spiceId', (req, res, next, id) => {
    const spiceId = Number(id);
    const spiceIndex = spiceRack.findIndex(spice => spice.id === spiceId);

    if (spiceIndex !== -1) {
        req.spiceIndex = spiceIndex;
        next();
    }
    else{
        res.sendStatus(404);
    }
})


app.get('/spices/', (req, res, next) => {
    res.send(spiceRack);
});

app.post('/spices/', (req, res, next) => {
    const newSpice = req.body.spice;
    if (newSpice.name && newSpice.grams) {
        newSpice.id = nextSpiceId++;
        spiceRack.push(newSpice);
        res.send(newSpice);
    } else {
        res.status(400).send();
    }
});

app.get('/spices/:spiceId', (req, res, next) => {
    res.send(spiceRack[req.spiceIndex]);
});

app.put('/spices/:spiceId', (req, res, next) => {
    spiceRack[req.spiceIndex] = req.body.spice;
    res.send(spiceRack[req.spiceIndex]);
});

app.delete('/spices/:spiceId', (req, res, next) => {
    spiceRack.splice(req.spiceIndex, 1);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});