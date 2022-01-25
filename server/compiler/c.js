const compiler = "gcc"
const inputCode = "main.c"
const { exec } = require("child_process");
const sf = require('../js/saveFile')

const cExecute = (code, args) => {
    // console.log("ye")
    return new Promise((resolve, reject) => {
        sf.saveFile(inputCode, code)
            .then(() => {
                sf.saveFile('input.txt', args)
                    .then((err) => {
                        if (err) {
                            console.log("error")
                            reject()
                        }
                    })

                exec(`${compiler} ${inputCode}`, (error, stdout, stderr) => {
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

                    exec('a < ' + 'input.txt', (err, stdout, stderr) => {
                        if (err) {
                            console.log("ERROR " + err)
                            resolve({
                                err: true,
                                output: err,
                                error: stderr
                            })
                        }
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
    cExecute,
}