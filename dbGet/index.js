const Db = require('mongodb').Db;
const MongoClient = require('mongodb').MongoClient;


module.exports = async function (context, req) {
        const url = process.env['CUSTOMCONNSTR_MONGODB'];
    const dbName = "hackathonfrankfurtbb";
    console.log("Query"+ req.query.name)
    var bodyObject;


    const connectedClient = await MongoClient.connect(url, {useNewUrlParser: true}, (err, db) => {
        db.db(dbName).collection('users').findOne({}, (err, doc) => {
            console.log("Hier sollten wir das Dokument haben!" + doc.name)

            $bodyObject = doc.name;

        context.res = {
        status: 400,
        body: "Test " +  bodyObject
    }
    context.done;

    });
        })
//outside of DB Connect, inside Function


    //fehler, habe doc.name noch nicht außerhalb meiner Function


};