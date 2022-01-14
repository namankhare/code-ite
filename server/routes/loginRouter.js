const express = require('express')
let jwt = require('jsonwebtoken');
const loginRouter = express.Router()
const pool = require('../config/db');

loginRouter.route('/')
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
                // console.log(req.body);
                const email = req.body.email
                const password = req.body.password
                //TODO: return user id

                let sql = "SELECT * FROM users WHERE email ='" + email + "'AND password ='" + password + "'"
                conn.execute(sql, (err, data) => {
                    if (err) {
                        console.log(err);
                        res.json({ error: err });
                    }
                    else {
                        delete data[0].password;
                        let token = jwt.sign({ _id: data[0].id, email: data[0].email }, process.env.SECRET);
                        res.cookie("token", token, { expire: new Date() + 9999 })
                        const { id, name, email } = data[0]
                        return res.json({ user: { id, name, email }, token: token });
                    }
                });
            }
        })
    })



module.exports = loginRouter
