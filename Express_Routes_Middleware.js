/*
    Code duplication is an invitation for bugs. If incorrect code is copy-and-pasted in multiple places, a developer might remedy the flaws in only a few of those places and fail to fix the buggy code everywhere. 
    In this course, we will investigate several ways to avoid replication and reduce complexity. In programming in general, this often means putting the reused code into reusable containers like functions and objects. 
    In Express specifically, this will also mean composing our desired functionality into a series of middleware functions.
*/


const express = require('express');
const app = express();

app.use(express.static('public'));

const PORT = process.env.PORT || 4001;

const jellybeanBag = {
    mystery: {
        number: 4
    },
    lemon: {
        number: 5
    },
    rootBeer: {
        number: 25
    },
    cherry: {
        number: 3
    },
    licorice: {
        number: 1
    }
};

/*  Middleware executed averytime:
    Logging Middleware
*/
app.use((req, res, next) => {
    console.log(`${req.method} Request Received`);
    next();
});

// Middleware executed every time the route is used: /beans/:beanName
app.use('/beans/:beanName', (req, res, next) => {
    const beanName = req.params.beanName;
    if (!jellybeanBag[beanName]) {
        console.log('Response Sent');
        return res.status(404).send('Bean with that name does not exist');
    }

    req.beanName = beanName;
    req.bean = jellybeanBag[beanName];
    next();
});

// Middleware executed every time a route from the array is used:
app.use(['/beans/', '/beans/:beanName'], (req, res, next) => {
    let bodyData = '';
    req.on('data', (data) => {
        bodyData += data;
    });
    req.on('end', () => {
        if (bodyData) {
            req.body = JSON.parse(bodyData);
        }
        next();
    });
});



app.get('/beans/', (req, res, next) => {
    res.send(jellybeanBag);
    console.log('Response Sent');
});

app.post('/beans/', (req, res, next) => {
    const body = req.body;
    const beanName = body.name;
    if (jellybeanBag[beanName] || jellybeanBag[beanName] === 0) {
        return res.status(400).send('Bean with that name already exists!');
    }
    const numberOfBeans = Number(body.number) || 0;
    jellybeanBag[beanName] = {
        number: numberOfBeans
    };
    res.send(jellybeanBag[beanName]);
    console.log('Response Sent');
});

app.get('/beans/:beanName', (req, res, next) => {
    res.send(req.bean);
    console.log('Response Sent');
});

app.post('/beans/:beanName/add', (req, res, next) => {
    const numberOfBeans = Number(req.body.number) || 0;
    req.bean.number += numberOfBeans;
    res.send(req.bean);
    console.log('Response Sent');
});

app.post('/beans/:beanName/remove', (req, res, next) => {
    const numberOfBeans = Number(req.body.number) || 0;
    if (req.bean.number < numberOfBeans) {
        return res.status(400).send('Not enough beans in the jar to remove!');
    }
    req.bean.number -= numberOfBeans;
    res.send(req.bean);
    console.log('Response Sent');
});

app.delete('/beans/:beanName', (req, res, next) => {
    const beanName = req.params.beanName;
    if (!req.bean) {
        return res.status(404).send('Bean with that name does not exist');
    }
    req.bean = null;
    res.status(204).send();
    console.log('Response Sent');
});

app.put('/beans/:beanName/name', (req, res, next) => {
    const beanName = req.params.beanName;
    if (!req.bean) {
        return res.status(404).send('Bag with that name does not exist');
    }

    const newName = req.body.name;
    jellybeanBag[newName] = req.bean;
    req.bean = null;
    res.send(jellybeanBag[newName]);
    console.log('Response Sent');
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});