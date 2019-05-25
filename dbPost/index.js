const Db = require('mongodb').Db;
const MongoClient = require('mongodb').MongoClient;

module.exports = async function (context, req) {
    const url = process.env['CUSTOMCONNSTR_MONGODB'];
    const dbName = "hackathonfrankfurtbb";



    console.log("Body" + req.body)

    MongoClient.connect(url,{useNewUrlParser: true}, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        var myobj = { name: "Company Inc", address: "Highway 37" };
        dbo.collection("users").insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });

    context.done;
};

