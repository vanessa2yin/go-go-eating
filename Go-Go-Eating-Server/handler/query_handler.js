const server = require('../server.js');

module.exports.runQuery = async function(query) {
    return new Promise((resolve, reject) => {
        server.connection.query(query,[],(error, rows, fields) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(rows);
            }
        });
    });
}