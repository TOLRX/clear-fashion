const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const { ObjectId } = require('mongodb');


const PORT = 8092;

const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

const {MongoClient} = require('mongodb');
const uri = 'mongodb+srv://bozo:Caline02@clearfashion.9uooewt.mongodb.net/test';
const client = new MongoClient(uri, { useNewUrlParser: true });
const dbName = 'clearfashion';
let db, collection;
const MONGODB_DB_NAME = 'clearfashion';
const collectionName = "products";

client.connect(err => {
  if (err) throw err;
  console.log('Connected to database');

  db = client.db(dbName);
  collection = db.collection(collectionName);


});



app.options('*', cors());

app.get('/', (request, response) => {
  response.send({'ack': true});
});



app.get("/products", async (request, response) => {
  // return updated list
  const { limit = 12, brand = 'All brands', price = 'All price' } = request.query;
  collection = db.collection('products');
  if (brand =='All brands' && price == 'All price') {
    const products = await collection.find().sort({"price" : 1}).limit(parseInt(limit)).toArray();
    console.log('Each products of the collection');
    console.log(products);
    response.json({"total":products.length, "limit": parseInt(limit), "result": products});
  }

  else if (price == 'All price') {
    const products = await collection.find({brand}).sort({"price" : 1}).limit(parseInt(limit)).toArray();
    response.json({"total":products.length, "limit": parseInt(limit), "result": products});
  }

  else if (brand == 'All brands') {
    const products = await collection.find({"price" : {"$lt" : parseInt(price)}}).sort({"price" : 1}).limit(parseInt(limit)).toArray();
    console.log(products);
    response.json({"total":products.length, "limit": parseInt(limit), "result": products});
  }
  else {
    const products = await collection.find({brand,"price" : {"$lt" : parseInt(price)}}).sort({"price" : 1}).limit(parseInt(limit)).toArray();
    response.json({"total":products.length, "limit": parseInt(limit), "result": products});
  }
  

});

app.get('/products/:id', async (request, response) =>{
  collection = db.collection('products');
  //We want to be able to search items according to their mongodb id (normal ones) or according to their uuid ids.
  //So we class them according to the type of id they have before printing the item :
  console.log(request.params.id.length);
  if (request.params.id.length>24){
    const products = await collection.find({"uuid" : request.params.id}).toArray();
    response.json(products);
  }
  else {
    const products = await collection.find({"_id" : ObjectId(request.params.id)}).toArray();
    response.json(products);
  } 

})

app.listen(PORT, () => {
  console.log(`📡 Running on port ${PORT}`);
});


