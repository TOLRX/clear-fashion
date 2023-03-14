/* eslint-disable no-console, no-process-exit */
"use strict";
const dedicatedbrand = require('./eshops/dedicatedbrand');
const montlimart = require('./eshops/montlimart');
const circle_sportswear = require('./eshops/circle_sportswear');

const fetchProducts = async (page = 1, size = 12) => {
  try {
    const response = await fetch(
      `https://clear-fashion-api.vercel.app?page=${page}&size=${size}`
    );
    const body = await response.json();

    if (body.success !== true) {
      console.error(body);
      return {currentProducts, currentPagination};
    }
    return body.data;
  }  catch (error) {
    console.error(error);
    return {currentProducts, currentPagination};
  }
};

async function sandbox (eshop = 'https://www.dedicatedbrand.com/en/men/news') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} eshop`);

    const products1 = await dedicatedbrand.scrape(eshop);  

    console.log('<===---------------> 1/6 done');
    

    const eshop2 = 'https://www.dedicatedbrand.com/en/women/news';

    console.log(`🕵️‍♀️  browsing ${eshop2} eshop`);

    const products2 = await dedicatedbrand.scrape(eshop2);
    
    console.log('<======------------> 2/6 done');


    const eshop3 = 'https://www.montlimart.com/99-vetements'; //contain every clothes of the site, one call will be enough.

    console.log(`🕵️‍♀️  browsing ${eshop3} eshop`);

    const products3 = await montlimart.scrape(eshop3);

    console.log('<=========---------> 3/6 done');

    const eshop4= 'https://shop.circlesportswear.com/collections/all'; // One more time, every products are on this page.

    console.log(`🕵️‍♀️  browsing ${eshop4} eshop`);
    
    const products4 = await circle_sportswear.scrape(eshop4);

    console.log('<=========---------> 4/6 done');

    //console.log(products4);

    console.log(`🕵️‍♀️  browsing https://clear-fashion-api.vercel.app?page=1&size=200 eshop`);
  
    const products5 = await fetchProducts(1,200);


    console.log('<===============---> 5/6 done');

    console.log(`🕵️‍♀️  Gathering products ...`);

    const products = products1.concat(products2).concat(products3).concat(products4).concat(products5.result);

    console.log(products);


    console.log(`🕵️‍♀️  Creating file`)

    // Product exportation
    var json = JSON.stringify(products);
    var fs = require('fs');
    fs.writeFileSync('Products_list.json', json);

    console.log('<==================> 6/6 done');

    console.log('File successfully Created !')

    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

sandbox(eshop);



