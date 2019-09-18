const express = require('express');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const mongodb = require('mongodb');
const uuidv4 = require('uuid/v4');
const bodyParser = require('body-parser');
const passport = require('passport');
const DiscordStrategy = require('passport-discord');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const MongoClient = require('mongodb').MongoClient;
const serve = require('./serve');
const port = process.env.PORT || 5000;
const SCOPES = ['identify'];

let db;
let client;
const url = 'mongodb://localhost:27017/formdb';

const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '/');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });

// Initialize connection once
/*MongoClient.connect(url, { useNewUrlParser: true }, (err, mongoClient) => {
  if(err) throw err;

    client = mongoClient;
    db = client.db('formdb');
  // Start the application after the database connection is ready
  
});*/

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(cookieParser('b1d30G4m35'));
app.use(cookieSession({
  secret: 'b1d30G4m35',
  maxAge:  7 * 24 * 60 * 60 * 1000,
}));

app.use(passport.initialize());
app.use(passport.session());
// Database manipulation functions

passport.use(new DiscordStrategy({
  clientID: '502382704529244190',
  clientSecret: 'ydzghjCI6K3RY3XcDfonHEgvSFtt_Lro',
  callbackURL: '/api/auth',
  scope: SCOPES
},
(accessToken, refreshToken, profile, cb) => {
  process.nextTick(() => cb(null, profile));
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

const router = express.Router();

router.get('/login', (req, res, next) => {
    const state = req.query ? JSON.stringify({id: req.query.id, path: req.query.path}) : null;
    if (state) {
      const authentication = passport.authenticate('discord', {state, scope: SCOPES});
      authentication(req, res, next);
      return;
    } else {
      const authentication = passport.authenticate('discord', {scope: SCOPES});
      authentication(req, res, next);
      return;
    }
  }
);

router.get('/auth', passport.authenticate('discord', {failureRedirect: '/'}), (req, res) => {
  let state = null;
  if (req.query.state) {
    state = JSON.parse(req.query.state);
  }
  const formId = state ? state.id : null;
  const path = state ? state.path : null;
  if (formId && path) {
    res.redirect(`/#/${path}/${formId}`);
    return;
  }
  res.redirect('/');
});

router.use((req, res, next) => {
  if (!req.isAuthenticated() && req.method !== 'OPTIONS') {
    res.status(401);
    res.json("not authorized!");
    return;
  }
  next();
});

router.get('/forms/', asyncMiddleware(async (req, res, next) => {
  const userId = req.user.id;

  const forms = await db.collection('forms').find({userId}).toArray();
  const formsAndResultsArray = [];
  for (const form of forms) {
    const results = await db.collection('results').findOne({_id: form._id, userId});
    formsAndResultsArray.push({form, results: results.results.length});
  }

  res.json({icon: req.user.avatar, userId, formsAndResultsArray});
}));

router.get('/forms/:formId', (req, res, next) => {
  const _id = req.params.formId;
  const userId = req.user.id;
  const userIcon = req.user.avatar;
  db.collection('forms').findOne({_id, userId}, (err, doc) => {
    if (doc) {
      res.json({userId, userIcon, doc});
      return;
    } else {
      res.status(404);
      res.send('Form not found.');
      return;
    }
  })
});

router.post('/forms/', asyncMiddleware(async (req, res, next) => {
  const _id = uuidv4();
  const name = req.body.name;
  const date = req.body.date;
  const userId = req.user.id;
  const form = {
    order: [0],
    name,
    date, 
    objects: {
      0: {
        type: 'TITLE',
        title: 'Enter title',
        description: 'Enter description',
      }
    }
  }
  const insertObject = {_id, userId, form};
  const resultsInsertObject = {_id, userId, results: []};

  const result = await db.collection('forms').insertOne(insertObject);
  const resultsResult = result.insertedCount ? await db.collection('results').insertOne(resultsInsertObject) : null; 
  
  if(resultsResult.insertedCount) {
    res.json(_id);
    return;
  } else {
    res.status(500);
    res.send('Insert failed.')
    return;
  }
}));

router.put('/forms/:formId', asyncMiddleware(async (req, res, next) => {
  const form = req.body;
  const userId = req.user.id;
  const _id = req.params.formId;

  const insertObject = {_id, userId, form};

  const result = await db.collection('forms').findOneAndReplace({_id, userId}, insertObject);

  if (result.ok === 1) {
    res.json(insertObject);
    return;
  } else {
    res.status(500);
    res.send('Update failed.');
    return;
  }
}));

router.get('/results/:formId', asyncMiddleware(async (req, res, next) => {
  const _id = req.params.formId;
  const userId = req.user.id;

  db.collection('results').findOne({_id, userId}, (err, doc) => {
    if (doc) {
      res.json(doc.results);
      return;
    } else {
      res.status(404);
      res.send('Document not found.')
      return;
    }
  })
}))

router.post('/results/:formId', (req, res, next) => {
  const _id = req.params.formId;
  const userId = req.user.id;
  const username = req.user.username;
  const icon = req.user.avatar;
  const submission = req.body;

  db.collection('results').findOne({_id}, (err, doc) => {
    if (doc) {
      let results = doc.results;
      let found = false;
      for (let i = 0; i < results.length; i++) {
        if(results[i].userId == userId) {
          results[i] = {userId, username, icon, submission};
          found = true;
          break;
        }
      }
      if (!found) {
        results.push({userId, username, icon, submission});
      }
      db.collection('results').updateOne({_id}, {$set: {results}}, (err, result) => {
        if (result.result.ok === 1) {
          res.redirect('/');
          return;
        } else {
          res.redirect('/');
          return;
        }
      });
    }
  });
});

app.use('/api', router);

serve(app);