const Db = require('mongodb').Db;
const MongoClient = require('mongodb').MongoClient;

module.exports = async function (context, req) {
    const url = process.env['CUSTOMCONNSTR_MONGODB'];
    const dbName = "hackathonfrankfurtbb";
    const collectionName = "users"



    MongoClient.connect(url,{useNewUrlParser: true}, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        var myquery = { name: "horst" };
        var newvalues = { $set: {name: "horst", age: 123 } };
        dbo.collection(collectionName).updateOne(myquery, newvalues, function(err, res) {
            if (err) throw err;
            console.log("1 document updated");
            db.close();
        });
    });

};