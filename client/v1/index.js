// Invoking strict mode
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

console.log('🚀 This is it.');

const MY_FAVORITE_BRANDS = [
  {
    'name': 'Faguo',
    'url': 'https://www.faguo-store.com'
  },
  {
    'name': 'Loom',
    'url': 'https://www.loom.fr'
  },
  {
    'name': 'Ecclo',
    'url': 'https://ecclo.fr/'
  }
];

console.table(MY_FAVORITE_BRANDS);
console.log(MY_FAVORITE_BRANDS[0]);

/**
 * 🌱
 * Let's go with a very very simple first todo
 * Keep pushing
 * 🌱
 */

// 🎯 TODO 1: The cheapest t-shirt
// 0. I have 3 favorite brands stored in MY_FAVORITE_BRANDS variable
// 1. Create a new variable and assign it the link of the cheapest t-shirt
// I can find on these e-shops
// 2. Log the variable

console.log("TODO 1:")

const Cheapest_shirts = [
  {
    'name': 'Faguo',
    'url': 'https://www.faguo-store.com/fr/vetements/7204-aubrac-t-shirt-coton-coton-recycle-ecru-bleu.html'
  },
  {
    'name': 'Loom',
    'url': 'https://www.loom.fr/collections/t-shirts-polos/products/le-t-shirt-homme'
  },
  {
    'name': 'Ecclo',
    'url': 'https://ecclo.fr/products/t-shirt-noir-boycott-world-cup-2022'
  }
];
console.table(Cheapest_shirts)

/**
 * 👕
 * Easy 😁?
 * Now we manipulate the variable `marketplace`
 * `marketplace` is a list of products from several brands e-shops
 * The variable is loaded by the file `data.js`
 * 👕
 */

// 🎯 TODO 2: Number of products
// 1. Create a variable and assign it the number of products
// 2. Log the variable
console.log("TODO 2:")

var lengthprod = marketplace.length;
console.log(lengthprod);
console.log(marketplace);


// 🎯 TODO 3: Brands name
// 1. Create a variable and assign it the list of brands name only
// 2. Log the variable
// 3. Log how many brands we have

console.log("TODO 3:")

const Brandnames = marketplace.map(x=>x['brand']);
console.log(Brandnames);
var Brandnames_set = new Set(Brandnames);
console.log(Brandnames_set.size);

// 🎯 TODO 4: Sort by price
// 1. Create a function to sort the marketplace products by price
// 2. Create a variable and assign it the list of products by price from lowest to highest
// 3. Log the variable

function Sorting(ArrayToSort ) {
  for (var i=0;i<ArrayToSort.length;i++){
    var min = i;
    for (var j=i+1; j<ArrayToSort.length;j++) {
      if(ArrayToSort[j]['price'] < ArrayToSort[min]['price']){
        min = j; 
      }
   }
   var tmp = ArrayToSort[i];
   ArrayToSort[i] = ArrayToSort[min];
   ArrayToSort[min] = tmp;
  }
  return ArrayToSort
};

console.log("TODO 4:")
const tab1 = [...marketplace];
var sortedprice = Sorting(tab1);
console.log(sortedprice);


// 🎯 TODO 5: Sort by date
// 1. Create a function to sort the marketplace objects by products date
// 2. Create a variable and assign it the list of products by date from recent to old
// 3. Log the variable

function Sorting_date(ArrayToSort ) {
  for (var i=0;i<ArrayToSort.length;i++){
    var min = i;
    for (var j=i+1; j<ArrayToSort.length;j++) {
      if(ArrayToSort[j]['released'] > ArrayToSort[min]['released']){
        min = j; 
      }
   }
   var tmp = ArrayToSort[i];
   ArrayToSort[i] = ArrayToSort[min];
   ArrayToSort[min] = tmp;
  }
  return ArrayToSort
};

console.log("TODO 5:")

const tab2 = [...marketplace];
var sorteddate = Sorting_date(tab2);
console.log(sorteddate);

// 🎯 TODO 6: Filter a specific price range
// 1. Filter the list of products between 50€ and 100€
// 2. Log the list

function Filtering(value){
  return 50 <= value['price'] &&  value['price'] <= 100;
}
 const FilteredProd = marketplace.filter(Filtering);
 console.log("TODO 6:");
 console.log("Product between 50 and 100 €");

 console.log(FilteredProd);

// 🎯 TODO 7: Average price
// 1. Determine the average price of the marketplace
// 2. Log the average

console.log("TODO 7:");
var avg =0;
for (var i=0 ;i<marketplace.length;i++) {
  avg = avg + marketplace[i]['price'];
  
}
avg = avg/marketplace.length;
console.log("Average price of marketplace :");
console.log(avg);


/**
 * 🏎
 * We are almost done with the `marketplace` variable
 * Keep pushing
 * 🏎
 */

// 🎯 TODO 8: Products by brands
// 1. Create an object called `brands` to manipulate products by brand name
// The key is the brand name
// The value is the array of products
//
// Example:
// const brands = {
//   'brand-name-1': [{...}, {...}, ..., {...}],
//   'brand-name-2': [{...}, {...}, ..., {...}],
//   ....
//   'brand-name-n': [{...}, {...}, ..., {...}],
// };
//
// 2. Log the variable
// 3. Log the number of products by brands

console.log("TODO 8:");

var dico = {};

for(i = 0; i < marketplace.length; i++){
	if(!(marketplace[i]['brand'] in dico)){
		dico[marketplace[i]['brand']] = [marketplace[i]];
	} else {
		dico[marketplace[i]['brand']].push(marketplace[i]);
	}
};

console.log('All products grouped by brands :');
console.log(dico);

var keys = Object.keys(dico);
for(i = 0; i < keys.length; i++){
	console.log('Number of objects in '+keys[i] + ' : ' + dico[keys[i]].length.toString());
}

//Use map reduce

// 🎯 TODO 9: Sort by price for each brand
// 1. For each brand, sort the products by price, from highest to lowest
// 2. Log the sort

console.log("TODO 9:");

function Sorting_inverse(ArrayToSort ) {
  for (var i=0;i<ArrayToSort.length;i++){
    var min = i;
    for (var j=i+1; j<ArrayToSort.length;j++) {
      if(ArrayToSort[j]['price'] > ArrayToSort[min]['price']){
        min = j; 
      }
   }
   var tmp = ArrayToSort[i];
   ArrayToSort[i] = ArrayToSort[min];
   ArrayToSort[min] = tmp;
  }
  return ArrayToSort
};

var dico2={};
dico2 = JSON.parse(JSON.stringify(dico));
keys = Object.keys(dico2);

for (i = 0; i < keys.length; i++){
	dico2[keys[i]] = Sorting_inverse(dico2[keys[i]])
}
console.log('Dict with price sorted products :');
console.log(dico2);

// 🎯 TODO 10: Sort by date for each brand
// 1. For each brand, sort the products by date, from old to recent
// 2. Log the sort

console.log("TODO 10:");

function Sorting_date_inverse(ArrayToSort ) {
  for (var i=0;i<ArrayToSort.length;i++){
    var min = i;
    for (var j=i+1; j<ArrayToSort.length;j++) {
      if(ArrayToSort[j]['released'] < ArrayToSort[min]['released']){
        min = j; 
      }
   }
   var tmp = ArrayToSort[i];
   ArrayToSort[i] = ArrayToSort[min];
   ArrayToSort[min] = tmp;
  }
  return ArrayToSort
};

var dico3={};
dico3 = JSON.parse(JSON.stringify(dico));
keys = Object.keys(dico3);

for (i = 0; i < keys.length; i++){
	dico3[keys[i]] = Sorting_date_inverse(dico3[keys[i]])
}
console.log('Dict with date sorted products :');
console.log(dico3);

/**
 * 💶
 * Let's talk about money now
 * Do some Maths
 * 💶
 */

// 🎯 TODO 11: Compute the p90 price value
// 1. Compute the p90 price value of each brand
// The p90 value (90th percentile) is the lower value expected to be exceeded in 90% of the products

// In dico2, products are sorted by price so we will use it to compute the p90 value: 

console.log("TODO 11:");
var p90 = {};
for (i = 0; i < keys.length; i++){
  if (dico2[keys[i]].length <20){ // below this number, each value taken will be the last.
    //If it is not the case, it means that it will be above to the last one and equal to the second last
    // > 10% at 20
    p90[keys[i]] = dico2[keys[i]][dico2[keys[i]].length -1]['price']
  }
  else { //If it is not the case, we compute the formula length*(9/10) +1 and we take the natural above.
    // We had +1 because the result will be equal to the one chosen (-1 bcs index begin at 0).
    p90[keys[i]] = dico2[keys[i]][Math.ceil(dico2[keys[i]].length*(9/10)+1) - 1]['price']
  }
}
console.log('Dict withp90 values :');
console.log(p90);

//If the percentile is the lowest element of a list which is higher than p*100 % off total list values, we
//calculate it with this function to apply to an ascendant sorted array:
function percentile_value(arr, p){ // With sorted array
  for (i=0;i<arr.length;i++){
    console.log(arr[i]);
    console.log(i/arr.length);
    if((i/arr.length) >= p) {
      return arr[i];
    }
  }
}
console.log(percentile_value([0,1,2,3,4,4,5,6,7,8,9,10,37,40,48,83,88,89,90,91,92,100,102],0.7));

/**
 * 🧥
 * Cool for your effort.
 * It's almost done
 * Now we manipulate the variable `COTELE_PARIS`
 * `COTELE_PARIS` is a list of products from https://coteleparis.com/collections/homme?filter.v.availability=1&filter.p.m.gender.type=Homme&sort_by=manual
 * 🧥
 */

const COTELE_PARIS = [
  {
    'link':
      'https://coteleparis.com/collections/homme/products/casquette-cotele-vert-olive?_pos=7&_fid=2fee5844b&_ss=c?variant=43527862485222&tag=homme',
    'brand': 'coteleparis',
    'price': 30,
    'name': 'CASQUETTE CÔTELÉ VERT OLIVE',
    'photo':
      'https://cdn.shopify.com/s/files/1/0479/7798/8261/products/CCC.jpg?crop=center&height=1545&v=1672998800&width=1200',
    'uuid': 'f0742b42-dc8c-54ae-99a8-ebb7d6f8f44e',
    'released': '2022-12-26'
  },
  {
    'link':
      'https://coteleparis.com/collections/homme/products/pantalon-cargo-vert-olive?_pos=13&_fid=2fee5844b&_ss=c&variant=43470511767782?variant=43470511767782&tag=homme',
    'brand': 'coteleparis',
    'price': 120,
    'name': 'PANTALON CARGO VERT OLIVE',
    'photo':
      'https://cdn.shopify.com/s/files/1/0479/7798/8261/products/ZOOM4.png?crop=center&height=1545&v=1666946168&width=1200',
    'uuid': '2b9a47e3-ed73-52f6-8b91-379e9c8e526c',
    'released': '2022-12-03'
  },
  {
    'link':
      'https://coteleparis.com/collections/homme/products/doudoune-puffer-navy?_pos=1&_fid=2fee5844b&_ss=c?variant=43581300506854&tag=homme',
    'brand': 'coteleparis',
    'price': 225,
    'name': 'DOUDOUNE PUFFER NAVY',
    'photo':
      'https://cdn.shopify.com/s/files/1/0479/7798/8261/files/N6.png?crop=center&height=1545&v=1668444595&width=1200',
    'uuid': '65162222-255a-5ea7-81c7-fb1225193773',
    'released': '2022-11-15'
  },
  {
    'link':
      'https://coteleparis.com/collections/homme/products/doudoune-puffer-azur?_pos=12&_fid=2fee5844b&_ss=c?variant=43608484610278&tag=homme',
    'brand': 'coteleparis',
    'price': 225,
    'name': 'DOUDOUNE PUFFER AZUR',
    'photo':
      'https://cdn.shopify.com/s/files/1/0479/7798/8261/files/AZ3.png?crop=center&height=1545&v=1668444227&width=1200',
    'uuid': 'e206681e-41d7-565e-91b3-b18d99fe80c3',
    'released': '2022-10-25'
  },
  {
    'link':
      'https://coteleparis.com/collections/homme/products/pantalon-cargo-camel?_pos=10&_fid=2fee5844b&_ss=c&variant=43470435221734?variant=43470435221734&tag=homme',
    'brand': 'coteleparis',
    'price': 120,
    'name': 'PANTALON CARGO CAMEL',
    'photo':
      'https://cdn.shopify.com/s/files/1/0479/7798/8261/products/CAMEL2.png?crop=center&height=1545&v=1666264660&width=1200',
    'uuid': 'b3a171aa-7c56-51f4-b7fd-7d2cd1a87968',
    'released': '2022-08-26'
  },
  {
    'link':
      'https://coteleparis.com/collections/homme/products/casquette-cotele-noire?_pos=16&_fid=2fee5844b&_ss=c?variant=43527862288614&tag=homme',
    'brand': 'coteleparis',
    'price': 30,
    'name': 'CASQUETTE CÔTELÉ NOIRE',
    'photo':
      'https://cdn.shopify.com/s/files/1/0479/7798/8261/products/PORTEES10.jpg?crop=center&height=1545&v=1668765538&width=1200',
    'uuid': '0a228763-e73b-590b-b638-f7001b19b300',
    'released': '2022-11-20'
  },
  {
    'link':
      'https://coteleparis.com/collections/homme/products/pantalon-cargo-gris?_pos=2&_fid=2fee5844b&_ss=c&variant=43470494695654?variant=43470494695654&tag=homme',
    'brand': 'coteleparis',
    'price': 96,
    'name': 'PANTALON CARGO GRIS',
    'photo':
      'https://cdn.shopify.com/s/files/1/0479/7798/8261/products/GRISs3.png?crop=center&height=1545&v=1666946159&width=1200',
    'uuid': '8e39794a-f91a-5fa7-b38b-3d0b176d0ea7',
    'released': '2022-08-11'
  },
  {
    'link':
      'https://coteleparis.com/collections/homme/products/doudoune-puffer-camel?_pos=5&_fid=2fee5844b&_ss=c?variant=43608484577510&tag=homme',
    'brand': 'coteleparis',
    'price': 225,
    'name': 'DOUDOUNE PUFFER CAMEL',
    'photo':
      'https://cdn.shopify.com/s/files/1/0479/7798/8261/files/CoteleDoudouneRouille_5.jpg?crop=center&height=1545&v=1668444404&width=1200',
    'uuid': '60046927-2ef2-589d-823d-73224d6786c6',
    'released': '2023-01-21'
  },
  {
    'link':
      'https://coteleparis.com/collections/homme/products/casquette-cotele-camel?_pos=3&_fid=2fee5844b&_ss=c?variant=43527861928166&tag=homme',
    'brand': 'coteleparis',
    'price': 30,
    'name': 'CASQUETTE CÔTELÉ CAMEL',
    'photo':
      'https://cdn.shopify.com/s/files/1/0479/7798/8261/products/PORTEES7.jpg?crop=center&height=1545&v=1668765573&width=1200',
    'uuid': '94e80e8f-34e2-546a-95ac-11cd0aa3ba08',
    'released': '2022-09-06'
  },
  {
    'link':
      'https://coteleparis.com/collections/homme/products/casquette-cotele-denim?_pos=11&_fid=2fee5844b&_ss=c?variant=43527845937382&tag=homme',
    'brand': 'coteleparis',
    'price': 30,
    'name': 'CASQUETTE CÔTELÉ DENIM',
    'photo':
      'https://cdn.shopify.com/s/files/1/0479/7798/8261/products/Denim2.png?crop=center&height=1545&v=1668079318&width=1200',
    'uuid': '6f83f0f6-9343-5f8b-8822-bc347097ee49',
    'released': '2022-08-30'
  },
  {
    'link':
      'https://coteleparis.com/collections/homme/products/casquette-cotele-sable?_pos=14&_fid=2fee5844b&_ss=c?variant=43527862386918&tag=homme',
    'brand': 'coteleparis',
    'price': 30,
    'name': 'CASQUETTE CÔTELÉ SABLE',
    'photo':
      'https://cdn.shopify.com/s/files/1/0479/7798/8261/products/PORTEES2.jpg?crop=center&height=1545&v=1668765512&width=1200',
    'uuid': '29fede06-1f38-55d4-b970-0bbf0a668e68',
    'released': '2022-11-14'
  },
  {
    'link':
      'https://coteleparis.com/collections/homme/products/doudoune-puffer-rouille?_pos=9&_fid=2fee5844b&_ss=c?variant=43608490049766&tag=homme',
    'brand': 'coteleparis',
    'price': 225,
    'name': 'DOUDOUNE PUFFER ROUILLE',
    'photo':
      'https://cdn.shopify.com/s/files/1/0479/7798/8261/files/R3.png?crop=center&height=1545&v=1668444742&width=1200',
    'uuid': '0a8cf869-853b-5d78-ae72-298588b03f82',
    'released': '2022-08-24'
  },
  {
    'link':
      'https://coteleparis.com/collections/homme/products/chemise-milleraie-vert-olive?_pos=4&_fid=2fee5844b&_ss=c?variant=43565200572646&tag=homme',
    'brand': 'coteleparis',
    'price': 72,
    'name': 'CHEMISE MILLERAIE VERT OLIVE',
    'photo':
      'https://cdn.shopify.com/s/files/1/0479/7798/8261/products/Sanstitre-32.jpg?crop=center&height=1545&v=1670187986&width=1200',
    'uuid': 'af213407-d75c-5f40-9d52-14fb414224af',
    'released': '2022-10-03'
  },
  {
    'link':
      'https://coteleparis.com/collections/homme/products/chemise-milleraie-navy?_pos=15&_fid=2fee5844b&_ss=c?variant=43565199229158&tag=homme',
    'brand': 'coteleparis',
    'price': 90,
    'name': 'CHEMISE MILLERAIE NAVY',
    'photo':
      'https://cdn.shopify.com/s/files/1/0479/7798/8261/products/C8.jpg?crop=center&height=1545&v=1670187595&width=1200',
    'uuid': '1e40612e-fe04-5a70-be75-79ea5fa6fbbe',
    'released': '2023-01-18'
  },
  {
    'link':
      'https://coteleparis.com/collections/homme/products/veste-cotele-navy?_pos=8&_fid=2fee5844b&_ss=c&variant=42801558585574?variant=42801558585574&tag=homme',
    'brand': 'coteleparis',
    'price': 126,
    'name': 'VESTE CÔTELÉ NAVY',
    'photo':
      'https://cdn.shopify.com/s/files/1/0479/7798/8261/files/NAVY_PHOTO_SITE.png?crop=center&height=1545&v=1657553445&width=1200',
    'uuid': '49c4e2d8-0cb4-5867-a5b9-23bd7168149f',
    'released': '2022-08-15'
  },
  {
    'link':
      'https://coteleparis.com/collections/homme/products/pantalon-cargo-denim?_pos=6&_fid=2fee5844b&_ss=c&variant=43470484373734?variant=43470484373734&tag=homme',
    'brand': 'coteleparis',
    'price': 96,
    'name': 'PANTALON CARGO DENIM',
    'photo':
      'https://cdn.shopify.com/s/files/1/0479/7798/8261/products/ZOOM_3a7331f6-03ee-4a01-ba18-2e56eaa5d9e2.png?crop=center&height=1545&v=1666290425&width=1200',
    'uuid': 'c4714dca-29c3-5603-818a-75c9668d53ab',
    'released': '2022-10-17'
  }
];

// 🎯 TODO 1: New released products
// // 1. Log if we have new products only (true or false)
// // A new product is a product `released` less than 2 weeks.

function New_released(value){
  return (value['released'] - Date()) <= 2*7*24*3600*1000; //Temps de 2 semaines en millisecondes
}
console.log('Part 2');
 const New_release = COTELE_PARIS.filter(New_released);
 console.log("TODO 1:");
 console.log("Recent product :");

 console.log(New_release);
 console.log('But with 3 months :')

 function New_released_2(value){
  const current = new Date();
  const date_rel = new Date(value['released']);
  return (current - date_rel) <= 91*24*3600*1000; //Temps de 3 mois en millisecondes
}
const New_release2 = COTELE_PARIS.filter(New_released_2);

console.log(New_release2);

// 🎯 TODO 2: Reasonable price
// // 1. Log if coteleparis is a reasonable price shop (true or false)
// // A reasonable price if all the products are less than 100€

console.log('Product with a reasonable price :');
console.log("TODO 2:");
const Reasonable = COTELE_PARIS.filter(obj => obj['price'] <100);

console.log(Reasonable);


// 🎯 TODO 3: Find a specific product
// 1. Find the product with the uuid `2b9a47e3-ed73-52f6-8b91-379e9c8e526c`
// 2. Log the product

console.log('Product with a certain id :');
console.log("TODO 3:");
const idsearch = COTELE_PARIS.filter(obj => obj['uuid'] == '2b9a47e3-ed73-52f6-8b91-379e9c8e526c');

console.log(idsearch);

// 🎯 TODO 4: Delete a specific product
// 1. Delete the product with the uuid `2b9a47e3-ed73-52f6-8b91-379e9c8e526c`
// 2. Log the new list of product

console.log("TODO 4:");

const tab3 = [...COTELE_PARIS];

for( var i = 0; i < tab3.length; i++){ 
    
  if ( tab3[i]['uuid'] == '2b9a47e3-ed73-52f6-8b91-379e9c8e526c' ) { 

      tab3.splice(i, 1); 
  }
}
console.log(tab3)


// 🎯 TODO 5: Save the favorite product
// We declare and assign a variable called `blueJacket`

console.log("TODO 5:");


let blueJacket = {
  'link':
    'https://coteleparis.com/collections/homme/products/veste-cotele-navy?_pos=8&_fid=2fee5844b&_ss=c&variant=42801558585574?variant=42801558585574&tag=homme',
  'brand': 'coteleparis',
  'price': 126,
  'name': 'VESTE CÔTELÉ NAVY',
  'photo':
    'https://cdn.shopify.com/s/files/1/0479/7798/8261/files/NAVY_PHOTO_SITE.png?crop=center&height=1545&v=1657553445&width=1200',
  'uuid': '49c4e2d8-0cb4-5867-a5b9-23bd7168149f',
  'released': '2022-08-15'
};

// we make a copy of `blueJacket` to `jacket` variable
// and set a new property `favorite` to true
let jacket = blueJacket;

jacket.favorite = true;

// 1. Log `blueJacket` and `jacket` variables
// 2. What do you notice?

console.log(blueJacket);
console.log(jacket);

console.log('We notice that the copy and the original get changed.')
// We notice that the copy and the original get changed.

// we make a new assignment again
blueJacket = {
  'link':
    'https://coteleparis.com/collections/homme/products/veste-cotele-navy?_pos=8&_fid=2fee5844b&_ss=c&variant=42801558585574?variant=42801558585574&tag=homme',
  'brand': 'coteleparis',
  'price': 126,
  'name': 'VESTE CÔTELÉ NAVY',
  'photo':
    'https://cdn.shopify.com/s/files/1/0479/7798/8261/files/NAVY_PHOTO_SITE.png?crop=center&height=1545&v=1657553445&width=1200',
  'uuid': '49c4e2d8-0cb4-5867-a5b9-23bd7168149f',
  'released': '2022-08-15'
};

// 3. Update `jacket` property with `favorite` to true WITHOUT changing blueJacket properties

const jacket2 = {...blueJacket};
jacket2.favorite = true;

console.log(blueJacket);
console.log(jacket2);

console.log('Here it works well.')
// Here it works well.

/**
 * 🎬
 * The End: last thing to do
 * 🎬
 */

// 🎯 LAST TODO: Save in localStorage
// 1. Save MY_FAVORITE_BRANDS in the localStorage
// 2. log the localStorage

console.log("TODO LAST:");

//Put the stringify for each object which is not an str + a name to find it again (by parsing JSON).
console.log("Dict", JSON.stringify(MY_FAVORITE_BRANDS));
window.localStorage.setItem("Dict", JSON.stringify(MY_FAVORITE_BRANDS));
console.log(localStorage);

var obj = JSON.parse(localStorage.getItem("Dict"));
console.log(obj);