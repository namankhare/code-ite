const express = require('express')
const codeRouter = express.Router()
const fs = require('fs')
const cCompiler = require('../compiler/c')
const cppCompiler = require('../compiler/cpp')
const javaCompiler = require('../compiler/java')
// args //code //lang
//encode / decode
const decodeRes = (str) => {
    var buf = Buffer.from(str, 'base64');
    return buf.toString('utf-8');
}

const encodeRes = (str) => {
    var buf = Buffer.from(str, 'utf-8');
    return buf.toString('base64');
}

const deleteFile = (filename) => {
    fs.unlink(filename, function (err) {
        if (err) {
            // console.log("SORRY NOT DELETED")
        };
        // console.log('File deleted!');
    });
}

codeRouter.route('/')
    .all((req, res, next) => {
        next();
    })
    .post((req, res) => {
        const code = decodeRes(req.body.code)
        const args = decodeRes(req.body.args)
        const lang = decodeRes(req.body.lang)
        // console.log(code, args, lang)

        if (!req.body.code || !req.body.lang) {
            return res.send(encodeRes("Cannot read code"));
        }
        switch (lang) {
            case "c": return cCompiler.cExecute(code, args)
                .then(data => {
                    var output = encodeRes(data)
                    res.end(JSON.stringify(output));
                    deleteFile('input.txt')
                    deleteFile('main.c')
                    deleteFile('a.exe')
                })
                .catch(err => {
                    res.end(JSON.stringify(err));
                    deleteFile('input.txt')
                    deleteFile('main.c')
                    deleteFile('a.exe')
                })
            case "cpp": return cppCompiler.cppExecute(code, args)
                .then(data => {
                    var output = encodeRes(data)
                    res.end(JSON.stringify(output));
                    deleteFile('input.txt')
                    deleteFile('main.cpp')
                    deleteFile('a.exe')
                })
                .catch(err => {
                    res.end(JSON.stringify(err));
                    deleteFile('input.txt')
                    deleteFile('main.cpp')
                    deleteFile('a.exe')
                })
            case "java": return javaCompiler.javaExecute(code, args)
                .then(data => {
                    var output = encodeRes(data)
                    res.end(JSON.stringify(output));
                    deleteFile('Main.class')
                    deleteFile('Main.Java')
                    deleteFile('myObjects.txt')
                    deleteFile('input.txt')
                })
                .catch(err => {
                    res.end(JSON.stringify(err));
                    deleteFile('Main.class')
                    deleteFile('Main.Java')
                    deleteFile('myObjects.txt')
                    deleteFile('input.txt')
                })
        }
    })



module.exports = codeRouter