const express = require("express");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();
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

// ******************create**********************
router.post(
  "",
  checkAuth,
  (req, res, next) => {
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
    client.connect();
    client.query(`INSERT INTO public.device(devicename, latitude, longitude) VALUES ('${req.body.DeviceName}', '${req.body.latitude}', '${req.body.longitude}');`)
    .then(() => {
      res.status(201).json({
        message: "Device added successfully"
      });
      client.end();
    })
  });

// **********select all posts********
router.get("", (req, res, next) => {
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
  client.connect();
  client.query(`SELECT id, devicename, latitude, longitude FROM public.device;`)
    .then(documents => {
      fetchedPosts = documents;
      return fetchedPosts.rowCount;
    })
    .then(count => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        devices: fetchedPosts,
        maxPosts: count
      });
    });
});

//  *************select single*************
router.get("/:id", (req, res, next) => {
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
  client.connect()
  console.log(req.params.id);
  client.query(`SELECT id FROM public.device where id = ${req.params.id};`).then(post => {
      if (post) {
        res.status(200).json(post);
        client.end();
      } else {
        res.status(404).json({ message: "Post not found!" });
        client.end();
      }
  });
});

//  *******************delete************************
router.delete("/:id", checkAuth, (req, res, next) => {
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

  client.connect()
  client.query(`DELETE FROM public.device WHERE id = ${req.params.id};`)
  .then(result => {
      console.log(result);
      res.status(200).json({ message: "Post deleted!" });
    });
});

module.exports = router;
