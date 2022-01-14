const fs = require('fs')
const saveFile = (name, data) => {
    return new Promise((resolve, reject) => {

        fs.writeFile(name, data, function (err) {
            if (err) {
                console.log(err);
                reject()
            } else {
                resolve()
            }
        });
    })
}

module.exports = {
    saveFile
}