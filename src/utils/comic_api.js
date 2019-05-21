const mongodb = require('mongodb')

const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'comicdb'


const addSingleComic = (data = {}) => {
    if (data.length <= 0) {
        return 'No data'
    }
    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
        if (error) {
            return error
        }

        db.collection('comics').insertOne({
            title: data.comicTitle,
            issue: data.issueNum,
            type: data.comicType,
            publisher: data.publisher,
            read: data.read
        }, (error, result) => {
            if (error) {
                return 'Unable to insert comic'
            }

            return true
        })
    })
}

module.exports = {
    addSingleComic
}