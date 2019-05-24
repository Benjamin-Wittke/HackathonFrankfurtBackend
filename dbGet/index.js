const Db = require('mongodb').Db;
const MongoClient = require('mongodb').MongoClient;


module.exports = async function (context, req) {
    const url = "mongodb://hackathonfrankfurtbb:sPwLyMSDDSPdwIAzI8hsNQkW6iWVJUrJVAB5fJOV1Z4KB6WP2OTJHNglqxpJU3r8IRptGU8aWIJr89hEa7QVYQ==@hackathonfrankfurtbb.documents.azure.com:10255/?ssl=true";
    const dbName = "hackathonfrankfurtbb";

    const connectedClient = await MongoClient.connect(url, {useNewUrlParser: true}, (err, db) => {
        console.log("Hier in der DB" + db.db(dbName).collection('users').findOne());
        })

    context.res = {
        body: "Hallo hier"
    }
    context.done;

};