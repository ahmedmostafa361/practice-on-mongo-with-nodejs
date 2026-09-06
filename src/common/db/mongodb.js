/// connect to mongodb
const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const db = client.db('practice_mongo');
module.exports = db;