// app.js
// ==================================================================
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static('public'));

const PORT = process.env.PORT || 4001;

app.use(bodyParser.json());

const spiceRacks = [
    {
        id: 1,
        location: 'Kitchen Countertop',
    },
    {
        id: 2,
        location: 'Pantry',
    },
    {
        id: 3,
        location: 'Outdoor Barbecue',
    }
];

let nextSpiceRackId = 4;

app.param('spiceRackId', (req, res, next, id) => {
    const idToFind = Number(id);
    const rackIndex = spiceRacks.findIndex(spiceRack => spiceRack.id === idToFind);
    if (rackIndex !== -1) {
        req.spiceRack = spiceRacks[rackIndex];
        req.spiceRackIndex = rackIndex;
        next();
    } else {
        res.status(404).send('Spice Rack Not Found.');
    }
});

app.get('/spice-racks/', (req, res, next) => {
    res.send(spiceRacks);
});

app.post('/spice-racks/', (req, res, next) => {
    const newRack = req.body.spiceRack;
    newRack.id = nextSpiceRackId++;
    spiceRacks.push(newRack);
    res.send(newRack);
});

app.get('/spice-racks/:spiceRackId', (req, res, next) => {
    res.send(req.spiceRack);
});

app.put('/spice-racks/:spiceRackId', (req, res, next) => {
    const updatedRack = req.body.spiceRack;
    if (req.spiceRack.id !== updatedRack.id) {
        res.status(400).send('Cannot update Spice Rack Id');
    } else {
        spiceRacks[req.spiceRackIndex] = updatedRack;
        res.send(spiceRacks[req.spiceRackIndex]);
    }
});

app.delete('/spice-racks/:spiceRackId', (req, res, next) => {
    spiceRacks.splice(req.spiceRackIndex, 1);
    res.status(204).send();
});

const spicesRouter = require('./spicesRouter');
app.use('/spice-racks/:spiceRackId/spices', spicesRouter);


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});




// spicesRouter.js
// ==================================================================
const router = require('express').Router({ mergeParams: true });

const spices = [
    {
        id: 1,
        name: 'cardamom',
        grams: 45,
        spiceRackId: 1,
    },
    {
        id: 2,
        name: 'pimentón',
        grams: 20,
        spiceRackId: 1,
    },
    {
        id: 3,
        name: 'cumin',
        grams: 450,
        spiceRackId: 3,
    },
    {
        id: 4,
        name: 'sichuan peppercorns',
        grams: 107,
        spiceRackId: 2,
    }
];

let nextSpiceId = 5;

router.post('/', (req, res, next) => {
    const newSpice = req.body.spice;
    if (newSpice.name && newSpice.grams) {
        newSpice.id = nextSpiceId++;
        newSpice.spiceRackId = Number(req.spiceRack.id);
        spices.push(newSpice);
        res.status(201).send(newSpice);
    } else {
        res.status(400).send();
    }
});

router.get('/:spiceId', (req, res, next) => {
    const spiceId = Number(req.params.id);
    const spiceIndex = spices.findIndex(spice => spice.id === spiceId);
    if (spiceIndex !== -1) {
        res.send(spices[spiceIndex]);
    } else {
        res.status(404).send('Spice not found.');
    }
});

router.put('/:spiceId', (req, res, next) => {
    const spiceId = Number(req.params.id);
    const spiceIndex = spices.findIndex(spice => spice.id === spiceId);
    if (spiceIndex !== -1) {
        spices[spiceIndex] = req.body.spice;
        res.send(spices[spiceIndex]);
    } else {
        res.status(404).send('Spice not found.');
    }
});

router.delete('/:spiceId', (req, res, next) => {
    const spiceId = Number(req.params.id);
    const spiceIndex = spices.findIndex(spice => spice.id === spiceId);
    if (spiceIndex !== -1) {
        spices.splice(spiceIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Spice not found.');
    }
});

module.exports = router;