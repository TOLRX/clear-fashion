const products = require('./Products_list.json');


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
  /*
  async function main(){
    const {MongoClient} = require('mongodb');
    const MONGODB_URI = 'mongodb+srv://bozo:Caline02@clearfashion.9uooewt.mongodb.net/test';
    const MONGODB_DB_NAME = 'clearfashion';

    const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
    const db =  client.db(MONGODB_DB_NAME)

    //Find all products related to a given brands

    const brand = 'loom';

    const collection = db.collection('products');
    const products = await collection.find({brand}).toArray();
    console.log('Each products of the brand',brand);
    console.log(products);

    //Find all products less than a price

    price = 47;

    const products2 = await collection.find({"price" : {"$lt" : price}}).toArray();
    console.log("Each products having a lower price than", price.toString());
    console.log(products2);

    //Find all products sorted by price

    const products3 = await collection.aggregate([{"$sort" : {"price" : 1}}]).toArray();
    console.log("Each products sorted by price :");
    console.log(products3);

    //Find all products sorted by date

    const products4 = await collection.aggregate([{"$sort" : {"released" : 1}}]).toArray();
    console.log("Each products sorted by date :");
    console.log(products4);

    //Find all products scraped less than 3 months
    const products5 = await collection.aggregate([{ $project: { name:1, released:1, releasedate: { $subtract: [ new Date(), {$dateFromString: {"dateString": "$released"  }} ] }} }, {"$match" :{"releasedate":{"$lt" : 3*4*7*24*3600*1000}}}]).toArray();
    console.log("Each products released less than 2 months ago :");
    console.log(products5); 

  }
*/
  main();
  