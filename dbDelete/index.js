const Db = require('mongodb').Db;
const MongoClient = require('mongodb').MongoClient;

module.exports = async function (context, req) {
    const url = process.env['CUSTOMCONNSTR_MONGODB'];
    const dbName = "hackathonfrankfurtbb";
    const collectionName = "users"

    MongoClient.connect(url,{useNewUrlParser: true}, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        var myquery = { name: 'Company Inc' };
        dbo.collection(collectionName).deleteOne(myquery, function(err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
            db.close();
        });
    });
    context.done();
};