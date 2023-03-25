const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const { ObjectId } = require('mongodb');


const PORT = 8092;

const app = express();


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


// Call different products by calling /products?**** (limit = ...&brand=...)
//addition of size and page to fit well in the client side of TP8
app.get("/products", async (request, response) => {
  // return updated list
  db = client.db(dbName);
  var { limit = 12, brand = 'All brands', price = 'All price', page = 1,size = limit } = request.query;
  limit=size;
  collection = db.collection('products');
  const len = (await collection.find().toArray()).length;
  console.log(len);
  if (brand =='All brands' && price == 'All price') {
    const products = await collection.find().sort({"price" : 1}).skip(Math.min((page-1)*limit,len-limit)).limit(parseInt(limit)).toArray();
    console.log('Each products of the collection');
    console.log(products);
    response.json({"total":products.length, "limit": parseInt(limit), "result": products, "meta": {"currentPage": parseInt(page), "pageSize": parseInt(limit), "count":len, "pageCount":Math.ceil(len/parseInt(limit))}});
  }

  else if (price == 'All price') {
    const products = await collection.find({brand}).sort({"price" : 1}).skip(Math.min((page-1)*limit,len-limit)).limit(parseInt(limit)).toArray();
    response.json({"total":products.length, "limit": parseInt(limit), "result": products, "meta": {"currentPage": parseInt(page), "pageSize": parseInt(limit), "count":len, "pageCount":Math.ceil(len/parseInt(limit))}});
  }

  else if (brand == 'All brands') {
    const products = await collection.find({"price" : {"$lt" : parseInt(price)}}).sort({"price" : 1}).skip(Math.min((page-1)*limit,len-limit)).limit(parseInt(limit)).toArray();
    console.log(products);
    response.json({"total":products.length, "limit": parseInt(limit), "result": products, "meta": {"currentPage": parseInt(page), "pageSize": parseInt(limit), "count":len, "pageCount":Math.ceil(len/parseInt(limit))}});
  }
  else {
    const products = await collection.find({brand,"price" : {"$lt" : parseInt(price)}}).sort({"price" : 1}).skip(Math.min((page-1)*limit,len-limit)).limit(parseInt(limit)).toArray();
    response.json({"total":products.length, "limit": parseInt(limit), "result": products, "meta": {"currentPage": parseInt(page), "pageSize": parseInt(limit), "count":len, "pageCount":Math.ceil(len/parseInt(limit))}});
  }
  

});

app.get('/products/:id', async (request, response) =>{
  db = client.db(dbName);
  collection = db.collection('products');
  //We want to be able to search items according to their mongodb id (normal ones) or according to their uuid ids.
  //So we class them according to the type of id they have before printing the item :
  console.log(request.params.id.length);
  if (request.params.id.length>24){
    const products = await collection.find({"uuid" : request.params.id}).toArray();
    response.json({"result" :products, "meta": {"currentPage": parseInt(page), "pageSize": parseInt(limit), "count":len, "pageCount":Math.ceil(len/parseInt(limit))}});
  }
  else {
    const products = await collection.find({"_id" : ObjectId(request.params.id)}).toArray();
    response.json({"result" :products, "meta": {"currentPage": parseInt(page), "pageSize": parseInt(limit), "count":len, "pageCount":Math.ceil(len/parseInt(limit))}});
  } 

})

app.listen(PORT, () => {
  console.log(`📡 Running on port ${PORT}`);
});

//Export the Express API
module.exports = app;