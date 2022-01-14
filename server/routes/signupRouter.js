const express = require('express')
const signupRouter = express.Router()
const pool = require('../config/db')


signupRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200
        next()
    })
    .post((req, res, next) => {
        pool.getConnection((err, conn) => {
            if (err) {
                console.log(err);
                res.json({ error: err });
            }
            else {
                console.log(req.body);
                const email = req.body.email
                const password = req.body.password

                var sql = "SELECT name FROM users WHERE Email ='" + email + "'  AND Password = '" + password + "'";
                conn.query(sql, (err, dataa) => {
                    if (err) {
                        console.log(err);
                        res.json({ error: err });
                    }
                    else {
                        res.json({ data: dataa, msg: 'success' });
                    }
                });
            }
        })
    })



module.exports = signupRouter
