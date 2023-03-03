// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

/*
Description of the available api
GET https://clear-fashion-api.vercel.app/

Search for specific products

This endpoint accepts the following optional query string parameters:

- `page` - page of products to return
- `size` - number of products to return

GET https://clear-fashion-api.vercel.app/brands

Search for available brands list
*/

// current products on the page
let currentProducts = [];
let currentPagination = {};
let favorite_prods = new Set();

// instantiate the selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts');
const selectBrand = document.querySelector('#brand-select');
const recent = document.querySelector('#recent_check');
const reasonable = document.querySelector('#reasonable_check');
const sorting = document.querySelector('#sort-select');
const spanNbNews = document.querySelector('#nbNews');
const spanNbBrands = document.querySelector('#nbBrands');
const spanp50 = document.querySelector('#p50');
const spanp90 = document.querySelector('#p90');
const spanp95 = document.querySelector('#p95');
const spanrelease = document.querySelector('#Last_rel');
const fav = document.querySelector('#favorite');


/**
 * Set global value
 * @param {Array} result - products to display
 * @param {Object} meta - pagination meta info
 */
const setCurrentProducts = ({result, meta}) => {
  currentProducts = result;
  currentPagination = meta;
};

/**
 * Fetch products from api
 * @param  {Number}  [page=1] - current page to fetch
 * @param  {Number}  [size=12] - size of the page
 * @return {Object}
 */
const fetchProducts = async (page = 1, size = 12) => {
  try {
    const total = parseInt(document.getElementById('nbProducts').textContent) +222;
    if (size === 48 && page >5) {page =5;}
    if (size === 24 && page >10) {page =10;}
    const response = await fetch(
      `https://clear-fashion-api.vercel.app?page=${page}&size=${size}`
    );
    const body = await response.json();

    if (body.success !== true) {
      console.error(body);
      return {currentProducts, currentPagination};
    }

    return body.data;
  } catch (error) {
    console.error(error);
    return {currentProducts, currentPagination};
  }
};

/**
 * Render list of products
 * @param  {Array} products
 */
const renderProducts = products => {
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  const template = 
  //'<div class="product" id=idcol> <span>Product ID</span><a>Product link</a><span>Product price (in €)</span><label class="input-check">favorite checkbox</label></div> '
  products
    .map(product => {
      return `
      <div class="product" id=${product.uuid}>
        <span>${product.brand}</span>
        <a href="${product.link}" target="_blank">${product.name}</a>
        <span>${product.price} €</span>
        <label class="input-check"><input type="checkbox" 
        id=id${product.uuid}> favorite </label>
      </div>
    `;
    })
    .join('');

  div.innerHTML = template;
  fragment.appendChild(div);
  sectionProducts.innerHTML = '<h2>Products</h2>';
  sectionProducts.appendChild(fragment);
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderPagination = pagination => {
  const {currentPage, pageCount} = pagination;
  const options = Array.from(
    {'length': pageCount},
    (value, index) => `<option value="${index + 1}">${index + 1}</option>`
  ).join('');

  selectPage.innerHTML = options;
  selectPage.selectedIndex = currentPage - 1;
  const Brands = currentProducts.map(x=>x['brand']);
  var Brands_set = new Set(Brands);
  var Brandnames = Array.from(Brands_set);
  const Brandsoptions = `<option value="All">All</option>` + Array.from(
    {'length': Brandnames.length},
    (value, index) => `<option value="${Brandnames[index]}">${Brandnames[index]}</option>`
  ).join('');
  selectBrand.innerHTML = Brandsoptions;
  if(Brands_set.size == 1) {selectBrand.selectedIndex = 1;}
  else {selectBrand.selectedIndex = 0;}


};

/**
 * Render page selector
 * @param  {Object} pagination
 */

//If the percentile is the lowest element of a list which is higher than p*100 % off total list values, we
//calculate it with this function to apply to an ascendant sorted array:
function percentile_value(arr, p){ // With sorted array
  var ref = -1
  for (var i=0;i<arr.length;i++){
    if((i/arr.length) >= p) {
      if (arr[i-1] != arr[i]) {return arr[i];} // This line is necessary if the value which is over P%
                                         // of the array is equal to the previous one
    }
  }
}

function Sorting_val(ArrayToSort) {
  for (var i=0;i<ArrayToSort.length;i++){
    var min = i;
    for (var j=i+1; j<ArrayToSort.length;j++) {
      if(ArrayToSort[j] < ArrayToSort[min]){
        min = j; 
      }
   }
   var tmp = ArrayToSort[i];
   ArrayToSort[i] = ArrayToSort[min];
   ArrayToSort[min] = tmp;
  }
  return ArrayToSort
};


// Allow to fill all valeus corresponding to API datas.
const renderIndicators = pagination => {
  const {count} = pagination;
  console.log(pagination);

  //Number of products
  spanNbProducts.innerHTML = count;

  //Number of new products
  (async () => {
    const totalproducts = await fetchProducts(1, count);
    //Number of new products
    const recent_obj = totalproducts.result.filter(New_released);
    spanNbNews.innerHTML = recent_obj.length;

    //Number of Brands
    const Brandnames = totalproducts.result.map(x=>x['brand']);
    var Brandnames_set = new Set(Brandnames);
    spanNbBrands.innerHTML = Brandnames_set.size;

    //P-Values :
    var Price_values = totalproducts.result.map(x => x['price']);
    Price_values = Sorting_val(Price_values);
    spanp50.innerHTML = percentile_value(Price_values,0.5);
    spanp90.innerHTML = percentile_value(Price_values,0.9);
    spanp95.innerHTML = percentile_value(Price_values,0.95);
    
    var datesort = totalproducts.result.map(x => x['released']);
    var datesort = Sorting_val(datesort);
    spanrelease.innerHTML = datesort[count-1];

  })();
  
  
};

const render = (products, pagination) => {
  renderProducts(products);
  renderPagination(pagination);
  renderIndicators(pagination);
};

/**
 * Declaration of all Listeners
 */

/**
 * Select the number of products to display
 * Feature 0
 */
selectShow.addEventListener('change', async (event) => {
  const products = await fetchProducts(currentPagination.currentPage, parseInt(event.target.value));
  setCurrentProducts(products);
  
  render(currentProducts, currentPagination);
  sorting.selectedIndex = 0;
});

document.addEventListener('DOMContentLoaded', async () => {
  const products = await fetchProducts();

  setCurrentProducts(products);

  render(currentProducts, currentPagination);
  sorting.selectedIndex = 0;
});

/**
 * Browsing several pages
 * Feature 1
 */ 
selectPage.addEventListener('change', async (event) => {
  var products = await fetchProducts(parseInt(event.target.value), currentPagination.pageSize);
  setCurrentProducts(products, parseInt(event.target.value));

  // Check if Reasonable is checked
  var checked = document.querySelector('#reasonable_check:checked') !== null;
  console.log(checked); 
  if (checked) {
    console.log(products.result);
    const Reas_obj = products.result.filter(obj => obj['price'] <50);
    products = {'result': Reas_obj, 'meta': currentPagination};
    setCurrentProducts(products, currentPagination);
    }

  //Check if Recent is checked
  checked = document.querySelector('#recent_check:checked') !== null;
  console.log(checked);
  if (checked) {
    const recent_obj = currentProducts.filter(New_released);
    var RecentProds = {'result': recent_obj, 'meta': currentPagination};
    setCurrentProducts(RecentProds, currentPagination);

    }


  render(currentProducts, currentPagination);
  sorting.selectedIndex = 0;
});

/**
 * Filtering by brands
 * Feature 2
 */ 
  
selectBrand.addEventListener('change', async (event) => { 
  if (event.target.value === 'All') {
    const products = await fetchProducts(currentPagination.currentPage, currentPagination.pageSize);
    setCurrentProducts(products);
    console.log(products);
    render(currentProducts, currentPagination);
  } else {
    const Brandlist = [];
    for (var i=0;i<currentProducts.length;i++) {
      if (currentProducts[i]['brand'] == event.target.value) {Brandlist.push(currentProducts[i]);}
    }
    var Brandobj = {'result': Brandlist, 'meta': currentPagination}
    setCurrentProducts(Brandobj, currentPagination);
    render(currentProducts, currentPagination);
    console.log(event.target.value);
  }
  sorting.selectedIndex = 0;

});


/**
 * Filtering by recent product (date - date_release <2 weeks)
 * Feature 3
 */ 
function New_released(value){
  const current = new Date();
  const date_rel = new Date(value['released']);
  return (current - date_rel) <= 91*24*3600*1000; //3 months in milliseconds (no match wuth 2 weeks)
}

recent.addEventListener('change', async function()  {
  var checked = document.querySelector('#recent_check:checked') !== null;
  if (checked) {
    const recent_obj = currentProducts.filter(New_released);
    var RecentProds = {'result': recent_obj, 'meta': currentPagination};
    setCurrentProducts(RecentProds, currentPagination);
  }
  else {
    const products = await fetchProducts(currentPagination.currentPage, currentPagination.pageSize);
    setCurrentProducts(products);
  }
  
  //Check for potential reasonable product
  checked = document.querySelector('#reasonable_check:checked') !== null;
  if (checked) {
    const Reas_obj = currentProducts.filter(obj => obj['price'] <50);
    var products = {'result': Reas_obj, 'meta': currentPagination};
    setCurrentProducts(products, currentPagination);
    }
  render(currentProducts, currentPagination);
}) 


/**
 * Filtering by reasonable product (price<50)
 * Feature 4
 */ 
reasonable.addEventListener('change', async function()  {
  var checked = document.querySelector('#reasonable_check:checked') !== null;
  if (checked) {
    const Reas_obj = currentProducts.filter(obj => obj['price'] <50);
    var ReasProducts = {'result': Reas_obj, 'meta': currentPagination};
    setCurrentProducts(ReasProducts, currentPagination);
  }
  else {
    const products = await fetchProducts(currentPagination.currentPage, currentPagination.pageSize);
    setCurrentProducts(products);
  }

  //Check if Recent is checked
  checked = document.querySelector('#recent_check:checked') !== null;
  console.log(checked);
  if (checked) {
    const recent_obj = currentProducts.filter(New_released);
    var RecentProds = {'result': recent_obj, 'meta': currentPagination};
    setCurrentProducts(RecentProds, currentPagination);
    }

    render(currentProducts, currentPagination);
});
     
/**
 * Sorting by price
 * Feature 5
 * +
 * Sorting by Date
 * Feature 6
 */ 

function Sorting(ArrayToSort) {
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

function Sorting_inverse(ArrayToSort) {
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

sorting.addEventListener('change', async(event) => {
  console.log(currentProducts);
  if (event.target.value == 'price-asc') {
    var SortedPriceL = Sorting(currentProducts);
    var Products = {'result': SortedPriceL, 'meta': currentPagination};
    setCurrentProducts(Products, currentPagination);
  }

  if (event.target.value == 'price-desc') {
    var SortedPriceH = Sorting_inverse(currentProducts);
    var Products = {'result': SortedPriceH, 'meta': currentPagination};
    setCurrentProducts(Products, currentPagination);
  }

  if (event.target.value == 'date-asc') {
    var SortedDateL = Sorting_date_inverse(currentProducts);
    console.log(SortedDateL);
    var Products = {'result': SortedDateL, 'meta': currentPagination};
    setCurrentProducts(Products, currentPagination);
  }

  if (event.target.value == 'date-desc') {
    var SortedDateH = Sorting_date(currentProducts);
    console.log(SortedDateH);
    var Products = {'result': SortedDateH, 'meta': currentPagination};
    setCurrentProducts(Products, currentPagination);
  }

  render(currentProducts, currentPagination);
});


fav.addEventListener('change', async function()  {
  var checked = document.querySelector('#favorite:checked') !== null;
  if(checked) {
    for (var i=0;i<currentProducts.length;i++){
      console.log(currentProducts[i])

      var checked_prod = document.querySelector('#id'+currentProducts[i].uuid+':checked') !== null
      console.log(checked_prod);
      if(checked_prod){
        if(!favorite_prods.has(currentProducts[i])) {
          favorite_prods.add(currentProducts[i])
        }
      } else {
        console.log(favorite_prods);
        console.log(favorite_prods.has(currentProducts[i]));
        if(favorite_prods.has(currentProducts[i])) {
          favorite_prods.delete(currentProducts[i])
        }
      } 
    }
    var Favprods = {'result': Array.from(favorite_prods), 'meta': currentPagination};
    setCurrentProducts(Favprods, currentPagination);
  }
  else {
    const products = await fetchProducts(currentPagination.currentPage, currentPagination.pageSize);
    setCurrentProducts(products);
  }
  render(currentProducts, currentPagination);

});

