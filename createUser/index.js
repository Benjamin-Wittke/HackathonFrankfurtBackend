const Db = require('mongodb').Db;
const MongoClient = require('mongodb').MongoClient;

module.exports = async function (context, req) {
    const url = "mongodb://hackathonfrankfurtbb:sPwLyMSDDSPdwIAzI8hsNQkW6iWVJUrJVAB5fJOV1Z4KB6WP2OTJHNglqxpJU3r8IRptGU8aWIJr89hEa7QVYQ==@hackathonfrankfurtbb.documents.azure.com:10255/?ssl=true&replicaSet=globaldb";
    const dbName = "hackathonfrankfurtbb";

   var obj = req.body;

    //watch whether User can pair with someone
    MongoClient.connect(url, {useNewUrlParser: true}, (err, db) => {

        db.db(dbName).collection('users').find({}).toArray(function(err, result) {
        //in results nach Chatroom parsen mit queryParam als einer der Member

        for (var i = 0;  i < result.length; i++){
            if( result[i].topic.localeCompare(obj.topic) == 0){
                if( result[i].paired == false) {
                    console.log("WUHUUUUUUU")
                    //matchPartner abspeichern
                    obj.paired = true;
                    //hier db update:  result[i].paired = true;

                    //Chatraum erstellen
                    //Chatraumobjekt erstellen
                    var chat = {
                        name: obj.name,
                        id: obj.name + "_" + result[i].name,
                        members: [obj.name, result[i].name],
                        question: obj.question
                    }
                    console.log(chat)
                    db.db(dbName).collection('chatrooms').insertOne(chat, function (err, db) {
                        if (err) throw err;
                        console.log("chat inserted in DB")
                    })
                    //hier response fertig machen, worauf in Chatroom gejoint werden kann
                    context.res = {
                        chatroom: chat.id
                    }
                    return null
                }
            } else {

                //hier vielleicht eine response fertigen, das in Kürze ien Gespräch gefunden ist
            }
        }
        db.close();
    });
})

   //insert User in DB
    MongoClient.connect(url,{useNewUrlParser: true}, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        dbo.collection("users").insertOne(obj, function(err, res) {
            if (err) throw err;
            console.log("User inserted");
            db.close();
        });
    });



    context.done;
};
