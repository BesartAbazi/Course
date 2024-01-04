/*
    Merge Parameters
    When we’re building web endpoints, we might want to access some property of a complex object. In order to do this in Express, we can design a nested router. 
    This would be a router that is invoked within another router. In order to pass parameters the parent router has access to, we pass a special configuration object when defining the router.
*/

const sorcererRouter = express.Router();
const familiarRouter = express.Router({ mergeParams: true });

app.use('/sorcerer', sorcererRouter);
sorcererRouter.use('/:sorcererId/familiars', familiarRouter);

sorcererRouter.param('sorcererId', (req, res, next, id) => {
    const sorcerer = getSorcererById(id);
    req.sorcerer = sorcerer;
    next();
});

sorcererRouter.get('/', (req, res, next) => {
    res.status(200).send(Sorcerers);
    next();
});

familiarRouter.get('/', (req, res, next) => {
    res.status(200).send(`Sorcerer ${req.sorcerer} has familiars ${getFamiliars(sorcerer)}`);
});

/*
    In the code above we define two endpoints: /sorcerer and /sorcerer/:sorcererId/familiars. The familiars are nested into the sorcerer endpoint — indicating the relationship that a sorcerer has multiple familiars. 
    Take careful note of the {mergeParameters: true} argument that gets passed when creating the familiarRouter. 
    This argument tells Express that the familiarRouter should have access to parameters passed into its parent router, that is, the sorcererRouter. 
    We then tell express that the path for the familiarRouter is the same as the path for the sorcererRouter with the additional path /:sorcererId/familiars. 
    We then can create a family of routes (a router) built by appending routes to familiarRouter‘s base: /sorcerer/:sorcererId/familiars.
*/