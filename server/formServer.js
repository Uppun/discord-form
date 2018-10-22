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

app.get('/login', 
  passport.authenticate('discord', {scope: SCOPES})
);

app.get('/auth', passport.authenticate('discord', {failureRedirect: 'http://localhost:3000/'}), (req, res) => res.redirect('http://localhost:3000/'));

app.use((req, res, next) => {
  if (!req.isAuthenticated() && req.method !== 'OPTIONS') {
    res.status(401);
    res.json("not authorized!");
    return;
  }
  next();
});

app.get('/forms/', (req, res, next) => {
  db.collection('forms').find({}, (err, docs) => {
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
  db.collection('forms').findOne({_id: req.params.formId}, (err, doc) => {
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
  const insertObject = {_id, form};

  const result = await db.collection('forms').insertOne(insertObject);
  
  if(result.insertedCount) {
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
  const _id = req.params.formId;
  const insertObject = {_id, form};
  const result = await db.collection('forms').findOneAndReplace({_id}, insertObject);

  if (result.ok === 1) {
    res.json(insertObject);
    return;
  } else {
    res.status(500);
    res.send('Update failed.');
    return;
  }
}));