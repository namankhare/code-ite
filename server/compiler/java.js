const compiler = "javac";
const infile = "Main.java";
const fs = require('fs')
const { exec } = require("child_process");
const sf = require('../js/saveFile')



const javaExecute = (code, args) => {
    // console.log(args)
    return new Promise((resolve, reject) => {
        sf.saveFile(infile, code)
            .then(() => {
                sf.saveFile('input.txt', args)
                    .then((err) => {
                        if (err) {
                            console.log("error")
                            reject()
                        }
                    })

                exec(`${compiler} ${infile}`, (error, stdout, stderr) => {
                    if (error) {
                        console.log(`error: ${error.message}`);
                        resolve(error.message)
                        return;
                    }
                    if (stderr) {
                        console.log(`stderr: ${stderr}`);
                        resolve(stderr)
                        return;
                    }
                    console.log("SUCCESSFULLY COMPILED")

                    exec('java Main < ' + 'input.txt', (err, stdout, stderr) => {
                        if (err) {
                            console.log("ERROR " + err)
                            resolve({
                                err: true,
                                output: err,
                                error: stderr
                            })
                        }

                        console.log("OUTPUT ", stdout)
                        resolve(stdout)
                    })

                });

            })
            .catch(() => {
                console.log("ERROR SAVE FILE")
                const err = {
                    err: true,
                    output: "Internal Server Error!"
                }
                resolve(err)
            })
    })
}

module.exports = {
    javaExecute,
}