# simple-nodejs-rest-api

#### REST API for CRUD (Create-Read-Update-Delete)
Inspired by [Creating a REST API using Node.js, Express, and MongoDB](https://gist.github.com/iksose/9401758)

##### Installation
```python
npm install
node server.js
```

```
# get all users
GET http://localhost:3000/users
$ curl -i -X GET http://localhost:3000/users

# get user by ID
GET http://localhost:3000/users/userID
$ curl -i -X GET http://localhost:3000/users/userID

# add user
POST http://localhost:3000/users/
$ curl -i -X POST -H 'Content-Type: application/json' -d '{"username": "haha", "email": "123@123.com"}' http://localhost:3000/users

# modify user
PUT http://localhost:3000/users/userID
$ curl -i -X PUT -H 'Content-Type: application/json' -d '{"username": "haha", "email": "123@123.com"}' http://localhost:3000/users/userID

# delete user
DELETE http://localhost:3000/users/userID
$ curl -i -X DELETE http://localhost:3000/users/userID
```
