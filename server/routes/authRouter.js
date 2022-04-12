const express = require('express')
let jwt = require('jsonwebtoken');
const authRouter = express.Router()
const pool = require('../config/db');
const { isValidRefreshToken } = require('../controller/auth');
const bcrypt = require('bcrypt');


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
                conn.query(`SELECT * FROM users WHERE email = ?`, [email], async (err, data) => {
                    if (err) {
                        console.log(err);
                        res.json({ error: err });
                    }
                    else {
                        if (data.length > 0) {
                            const validPass = await bcrypt.compare(password, data[0].password);
                            if (!validPass) {
                                res.status(404);
                                return res.json({ error: "Wrong Password" });
                            } else {
                                delete data[0].password;
                                const { id, name, email } = data[0]
                                let token = jwt.sign({ _id: id, email: email, name: name }, process.env.SECRET, { expiresIn: "60s" });
                                res.cookie("token", token, { expire: new Date() + 9999, sameSite: "None", secure: true })
                                let refreshToken = jwt.sign({ _id: data[0].id }, process.env.REFRESHSECRET, { expiresIn: "7d" });
                                return res.json({ user: { id, name, email }, token: token, refreshToken: refreshToken });
                            }
                        } else {
                            res.status(404);
                            return res.json({ error: "Wrong Username or Password" });
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
                const email = req.body.email
                const plainpassword = req.body.password
                const username = req.body.username
                const name = req.body.name
                bcrypt.hash(plainpassword, 10, function (err, hash) {
                    var sql = "INSERT INTO users (`name`, `email`,`username`,`password`) VALUES ('" + name + "', '" + email + "','" + username + "','" + hash + "' )";
                    conn.query(sql, (err, dataa) => {
                        if (err) {
                            res.json({ error: err });
                        }
                        else {
                            res.json({ data: dataa, msg: 'success' });
                        }
                    });
                });

            }
        })
    })

authRouter.route('/renewAccessToken')
    .all((req, res, next) => {
        res.statusCode = 200
        next()
    })
    .post(isValidRefreshToken, (req, res) => {
        const oldAccessToken = req.cookies.token
        const refreshToken = req.body.refreshToken
        if (!refreshToken) {
            return res.json({ message: "User not authenticated!" })
        }
        let token = jwt.sign({ _id: req.auth._id }, process.env.SECRET, { expiresIn: "60s" });
        res.cookie("token", token, { expire: new Date() + 9999, sameSite: "None", secure: true })
        let newRefreshToken = jwt.sign({ _id: req.auth._id }, process.env.REFRESHSECRET, { expiresIn: "7d" });
        return res.json({ token: token, refreshToken: newRefreshToken })
    })



module.exports = authRouter