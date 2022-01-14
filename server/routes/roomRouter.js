const express = require('express')
const { v4: uuidv4 } = require('uuid');
//
const roomRouter = express.Router()
const pool = require('../config/db')

roomRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200
        next()
    })
    .get((req, res) => {
        res.redirect(`/croom/${uuidv4()}`);
    });

roomRouter.route('/:join')
    .all((req, res, next) => {
        res.statusCode = 200
        next()
    })
    .get((req, res) => {
        res.render("room", { roomId: req.params.join });
    });


module.exports = roomRouter