var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db;

var server = new Server('localhost', 27017, {auto_reconnect: true});
var userDb = new Db('userdb', server);

userDb.open(function(err, db) {
    if (!err) {
        console.log("Connected to 'userDb' database");
        db.collection('users', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'users' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

exports.findUserById = function(req, res) {
    //res.send({id:req.params.id, name:'the name', description:'description'});
    var id = req.params.id;
    console.log('Retrieving user: ' + id);
    userDb.collection('users', function(err, collection) {
        collection.findOne({'_id':new require('mongodb').ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAllUsers = function(req, res) {
    userDb.collection('users', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addUser = function(req, res) {
    var body = req.body;
    console.log('Adding user: ' + JSON.stringify(body));
    userDb.collection('users', function(err, collection) {
        collection.insert(body, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result));
                res.send(result);
            }
        });
    });
};

exports.updateUser = function(req, res) {
    var id = req.params.id;
    console.log('Updating user: ' + id);
    console.log(JSON.stringify(req.body));
    userDb.collection('users', function(err, collection) {
        collection.update({'_id':new require('mongodb').ObjectID(id)}, req.body, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating user: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(req.body);
            }
        });
    });
};

exports.deleteUser = function(req, res) {
    var id = req.params.id;
    console.log('Deleting user: ' + id);
    userDb.collection('users', function(err, collection) {
        collection.remove({'_id':new require('mongodb').ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        })
    })
}

// Populate database with sample data -- Only used once: the first time the application is started.
var populateDB = function() {
    var users = [
        {
            username: "habina",
            password: "123456",
            email: "123456@qq.com"
        },
        {
            username: "ebay",
            password: "ebay",
            email: "ebay@ebay.com"
        }
    ];

    userDb.collection('users', function(err, collection) {
         collection.insert(users, {safe:true}, function(err, result) {});
    });
};
