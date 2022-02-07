const express = require('express')
let jwt = require('jsonwebtoken');
const authRouter = express.Router()
const pool = require('../config/db');



authRouter.route('/login')
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
                const email = req.body.email
                const password = req.body.password
                conn.query(`SELECT * FROM users WHERE email = ? and password = ?`, [email, password], (err, data) => {
                    if (err) {
                        console.log(err);
                        res.json({ error: err });
                    }
                    else {
                        if (data.length > 0) {
                            delete data[0].password;
                            let token = jwt.sign({ _id: data[0].id, email: data[0].email }, process.env.SECRET, { expiresIn: "10s" });
                            res.cookie("token", token, { expire: new Date() + 9999, sameSite: true, path: '/', httpOnly: true })
                            const { id, name, email } = data[0]
                            let refreshToken = jwt.sign({ _id: data[0].id }, process.env.REFRESHSECRET, { expiresIn: "7d" });
                            return res.json({ user: { id, name, email }, token: token, refreshToken: refreshToken });
                        } else {
                            res.status(404);
                            res.json({ error: "Wrong Username or Password" });
                        }
                    }
                });
            }
        })
    })

authRouter.route('/signup')
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
                const username = req.body.username
                const name = req.body.name

                var sql = "INSERT INTO users (`name`, `email`,`username`,`password`) VALUES ('" + name + "', '" + email + "','" + username + "','" + password + "' )";
                conn.query(sql, (err, dataa) => {
                    if (err) {
                        res.json({ error: err });
                    }
                    else {
                        res.json({ data: dataa, msg: 'success' });
                    }
                });
            }
        })
    })

authRouter.route('/renewAccessToken')
    .post((req, res) => {
        console.log('Cookies: ', req.auth)
        const oldAccessToken = req.cookies.token
        const refreshToken = req.body.token
        if (!refreshToken) {
            return res.json({ message: "User not authenticated!" })
        }
        let token = jwt.sign(req.auth, process.env.SECRET, { expiresIn: "30s" });
        let nreRefreshToken = jwt.sign({ _id: data[0].id }, process.env.REFRESHSECRET, { expiresIn: "7d" });
        return res.json({ message: "fix kr isko" })
    })



module.exports = authRouter