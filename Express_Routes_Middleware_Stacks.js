// Multiple callbacks as additional parameters in a route:

const authenticate = (req, res, next) => {
  //...
};

const validateData = (req, res, next) => {
  //...
};

const getSpell = (req, res, next) => {
    res.status(200).send(getSpellById(req.params.id));
};

const createSpell = (req, res, next) => {
    createSpellFromRequest(req);
    res.status(201).send();
};

const updateSpell = (req, res, next) => {
    updateSpellFromRequest(req);
    res.status(204).send();
}

app.get('/spells/:id', authenticate, getSpell);

app.post('/spells', authenticate, validateData, createSpell);

app.put('/spells/:id', authenticate, validateData, updateSpell);