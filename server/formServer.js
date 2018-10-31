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
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });

// Initialize connection once
MongoClient.connect(url, { useNewUrlParser: true }, (err, mongoClient) => {
  if(err) throw err;

    client = mongoClient;
    db = client.db('formdb');
  // Start the application after the database connection is ready
  app.listen(port, () => console.log(`Listening on port ${port}`));
});

app.use(cookieParser('b1d30G4m35'));
app.use(cookieSession({
  secret: 'b1d30G4m35',
  maxAge:  7 * 24 * 60 * 60,
}));

app.use(passport.initialize());
app.use(passport.session());
// Database manipulation functions

passport.use(new DiscordStrategy({
  clientID: '502382704529244190',
  clientSecret: 'ydzghjCI6K3RY3XcDfonHEgvSFtt_Lro',
  callbackURL: 'http://localhost:5000/auth',
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

app.get('/login', (req, res, next) => {
    const state = req.query ? req.query.id : null;
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

app.get('/auth', passport.authenticate('discord', {failureRedirect: 'http://localhost:3000/'}), (req, res) => {
  const formId = req.query ? req.query.state : null;
  if (formId) {
    res.redirect(`http://localhost:3000/#/preview/${formId}`);
    return;
  }
  res.redirect('http://localhost:3000/');
});

app.use((req, res, next) => {
  if (!req.isAuthenticated() && req.method !== 'OPTIONS') {
    res.status(401);
    res.json("not authorized!");
    return;
  }
  next();
});

app.get('/forms/', (req, res, next) => {
  const userId = req.user.id;
  db.collection('forms').find({userId}, (err, docs) => {
    const formsArray = [];
    docs.forEach(doc => {
      formsArray.push(doc);
    },
    err => {
      if (!err) {
        res.json(formsArray);
      } else {
        res.status(500);
        res.send('Something went wrong!');
      }
    })
  })
});

app.get('/forms/:formId', (req, res, next) => {
  const _id = req.params.formId;
  const userId = req.user.id;
  db.collection('forms').findOne({_id, userId}, (err, doc) => {
    if (doc) {
      res.json(doc);
      return;
    } else {
      res.status(404);
      res.send('Form not found.');
      return;
    }
  })
});

app.post('/forms/', asyncMiddleware(async (req, res, next) => {
  const _id = uuidv4();
  const name = req.body.name;
  const userId = req.user.id;
  const form = {
    order: [0],
    name, 
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
    res.json(insertObject);
    return;
  } else {
    res.status(500);
    res.send('Insert failed.')
    return;
  }
}));

app.put('/forms/:formId', asyncMiddleware(async (req, res, next) => {
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

app.get('/results/:formId', asyncMiddleware(async (req, res, next) => {
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

app.post('/results/:formId', asyncMiddleware(async (req, res, next) => {
  const _id = req.params.formId;
  const userId = req.user.id;
  const submission = req.body;

  db.collection('results').findOne({_id}, (err, doc) => {
    if (doc) {
      let results = doc.results;
      let found = false;
      for (let i = 0; i < results.length; i++) {
        if(results[i].userId == userId) {
          results[i] = {userId, submission};
          found = true;
          break;
        }
      }
      if (!found) {
        results.push({userId, submission});
      }
      const insertRes = await db.collection('results').updateOne({_id}, {$set: {results}});
      if (insertRes.ok === 1) {
        res.send('Submission inserted.');
        res.redirect('http://localhost:3000/');
        return;
      } else {
        res.status(500);
        res.send('Submission failed!');
        res.redirect('http://localhost:3000/');
        return;
      }
    }
  });
}));