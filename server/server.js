const products = require('./Products_list.json');

/*
async function main() {
    const {MongoClient} = require('mongodb');
    const MONGODB_URI = 'mongodb+srv://bozo:Caline02@clearfashion.9uooewt.mongodb.net/test';
    const MONGODB_DB_NAME = 'clearfashion';

    const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
    const db =  client.db(MONGODB_DB_NAME);

    const collection = db.collection('products');
    const result = collection.insertMany(products);
    console.log(result);
  }
  */
  async function main(){
    const {MongoClient} = require('mongodb');
    const MONGODB_URI = 'mongodb+srv://bozo:Caline02@clearfashion.9uooewt.mongodb.net/test';
    const MONGODB_DB_NAME = 'clearfashion';

    const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
    const db =  client.db(MONGODB_DB_NAME)

    //Find all products related to a given brands

    const brand = 'loom';

    const collection = db.collection('products');
    const products = await collection.find({brand}).toArray();;
    console.log('Each products of the brand',brand);
    console.log(products);
  }

  main();
  