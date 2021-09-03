const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const client = require('../backend/database/postgreDb');
const router = express.Router();
const { BoundDirectivePropertyAst } = require("@angular/compiler");
const { error } = require("@angular/compiler/src/util");

router.post('/signup', (req, res, next) => {
const { Client } = require("pg");

const client = new Client({
    host: "localhost",
    port: 3001,
    user: "postgres",
    password: "Chidingloves(0)(0)",
    database: "ASC"
})

client.on("connect", () => {
    console.log("Database Connected");
})

client.on("end", () => {
    console.log("Database Disconnected");
})
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    client.connect();
    client.query(`INSERT INTO public.register(email, password) VALUES ('${req.body.email}', '${hash}');`).then(() => {
        client.end();
        res.send(200).json({
        message: "user created"
        })
    }).catch(err => {
      res.status(500).json({
          message: "Invalid authentication credentials!"
   })
  })
  }).catch(err => {
    res.status(500).json({
      message: 'Invalid authentication credentials!'
    })
  });
});

router.post("/login", (req, res, next) => {
  const { Client } = require("pg");

  const client = new Client({
      host: "localhost",
      port: 3001,
      user: "postgres",
      password: "Chidingloves(0)(0)",
      database: "ASC"
  })

  client.on("connect", () => {
      console.log("Database Connected");
  })

  client.on("end", () => {
      console.log("Database Disconnected");
  })
  let fetchedUser;
  client.connect();
  let user = client.query(`SELECT id, email, password FROM public.register where email= '${req.body.email}';`).then(user => {
    if(!user){
      return res.status(401).json({
        message: "Auth failed"
      });
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.password, fetchedUser.rows[0].password);
  }).then(result => {
    if(!result) {
      return res.status(401).json({
        message: "Invalid authentication credentials!"
      });
    }
    const token = jwt.sign({email: fetchedUser.rows[0].email, userId: fetchedUser.rows[0].id},'secret_this_should_be_longer',{ expiresIn: '1h' });
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        message: "Successfuly signed in"
      });
      client.end();
  })
  .catch(err => {
    return res.status(401).json({
      message: "Invalid authentication credentials!"
    });
  })
})

module.exports = router;
