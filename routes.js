"use strict";

const express = require("express");
const pagarme = require("pagarme");

const routes = express.Router();

routes.get("/", async function(req, res) {
  const response = await pagarme.client
    .connect({ api_key: "ak_test_TkP0pqMRsXUT4IcwREFujs2qoivCqB" })
    // .connect({ email: "client1@email5.net", password: "12345678" })
    .then(client => {
      return client.transactions.all();
    })
    .then(transactions => {
      // console.log(transactions);
      return transactions;
    })
    .catch(e => console.error(e.response));

  res.json(response);
});

routes.get("/checkout", function(req, res, next) {
  console.log("ENTROU: GET /CHECKOUT");
  res.render("checkout", {
    title: "Checkout Transparente"
  });
});

routes.post("/checkout", async function(req, res) {
  console.log("ENTROU: POST /CHECKOUT");
  const {
    amount,
    payment_method, // types: "boleto", "credit_card"
    card_number,
    card_cvv,
    card_expiration_date,
    card_holder_name,
    customer,
    billing,
    items
  } = req.body;

  const response = await pagarme.client
    .connect({ api_key: "ak_test_TkP0pqMRsXUT4IcwREFujs2qoivCqB" })
    .then(client => {
      return client.transactions.create({
        amount,
        payment_method,
        card_number,
        card_cvv,
        card_expiration_date,
        card_holder_name,
        customer,
        billing,
        items
      });
    })
    .then(transaction => {
      return transaction;
    })
    .catch(e => console.error(e.response));

  res.json(response);
});

routes.post("/checkout/check", async function(req, res) {
  console.log("ENTROU: POST /CHECKOUT/CHECK");

  let data = req.body;

  const response = await pagarme.client
    .connect({ api_key: "ak_test_TkP0pqMRsXUT4IcwREFujs2qoivCqB" })
    .then(client =>
      client.transactions.find({
        id: data.token
      })
    )
    .then(transaction => {
      return transaction;
    })
    .catch(e => console.error(e.response));

  res.json(response);
});

routes.get("/success", async function(req, res) {
  res.json("success");
});

routes.get("/pending", async function(req, res) {
  res.json("pending");
});

routes.get("/failure", async function(req, res) {
  res.json("failure");
});

module.exports = routes;
