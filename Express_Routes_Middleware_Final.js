/*
    Code duplication is an invitation for bugs. If incorrect code is copy-and-pasted in multiple places, a developer might remedy the flaws in only a few of those places and fail to fix the buggy code everywhere. 
    In this course, we will investigate several ways to avoid replication and reduce complexity. In programming in general, this often means putting the reused code into reusable containers like functions and objects. 
    In Express specifically, this will also mean composing our desired functionality into a series of middleware functions.

    Morgan:
    -------
    Morgan takes an argument to describe the formatting of the logging output
    With morgan in place, we’ll be able to remove the existing logging code.
    Once we see how fast it is to add logging with morgan, we won’t have to spend time in the future trying to figure out how to replicate that functionality.
    morgan('tiny') will return a middleware function that does a “tiny” amount of logging. See other parameter beside "tiny" in the morgan documentaion.
*/


const express = require('express');
const app = express();

app.use(express.static('public'));

const morgan = require('morgan');

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

// Middleware for body parsing
const bodyParser = (req, res, next) => {
    let queryData = '';
    req.on('data', (data) => {
        data = data.toString();
        queryData += data;
    });
    req.on('end', () => {
        if (queryData) {
            req.body = JSON.parse(queryData);
        }
        next();
    });
};

// Logging Middleware
app.use(morgan('tiny'));    // morgan('tiny') will return a middleware function that does a “tiny” amount of logging. See other parameter beside "tiny" in the morgan documentaion.

app.use('/beans/:beanName', (req, res, next) => {
    const beanName = req.params.beanName;
    if (!jellybeanBag[beanName]) {
        return res.status(404).send('Bean with that name does not exist');
    }
    req.bean = jellybeanBag[beanName];
    req.beanName = beanName;
    next();
});

app.get('/beans/', (req, res, next) => {
    res.send(jellybeanBag);
});

app.post('/beans/', bodyParser, (req, res, next) => {
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
});

app.get('/beans/:beanName', (req, res, next) => {
    res.send(req.bean);
});

app.post('/beans/:beanName/add', bodyParser, (req, res, next) => {
    const numberOfBeans = Number(req.body.number) || 0;
    req.bean.number += numberOfBeans;
    res.send(req.bean);
});

app.post('/beans/:beanName/remove', bodyParser, (req, res, next) => {
    const numberOfBeans = Number(req.body.number) || 0;
    if (req.bean.number < numberOfBeans) {
        return res.status(400).send('Not enough beans in the jar to remove!');
    }
    req.bean.number -= numberOfBeans;
    res.send(req.bean);
});

app.delete('/beans/:beanName', (req, res, next) => {
    const beanName = req.beanName;
    jellybeanBag[beanName] = null;
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});