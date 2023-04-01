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
var favorite_prods = (typeof favorite_prods === 'undefined') ? [] : favorite_prods;

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
    const {pageSize} = currentPagination;
    const {count} = currentPagination;
    if (page > Math.ceil(count/pageSize)) {currentPagination.pageSize = Math.ceil(count/pageSize);}
    const response = await fetch(
      `https://server-tau-taupe-69.vercel.app/products?page=${page}&size=${size}`
    );
    const body = await response.json();
    return body;
  } catch (error) {
    console.error(error);
    return {currentProducts, currentPagination};
  }
};

const chosen_prods = (products) => {
  var {currentPage} = currentPagination;
  const {pageSize} = currentPagination;
  const {count} = currentPagination;
  if (currentPage> Math.ceil(count/pageSize) ) {
    console.log(currentProducts);
    console.log(products);
    console.log((currentPage-1)*pageSize);
    console.log((currentPage)*pageSize);
    currentPage = Math.ceil(products.length/pageSize);
    products = products.slice((currentPage-1)*pageSize,(currentPage)*pageSize );
    return products;
  }
  else {
    console.log(currentProducts);
    console.log(products);
    console.log((currentPage-1)*pageSize);
    console.log((currentPage)*pageSize);
    products = products.slice((currentPage-1)*pageSize,(currentPage)*pageSize );
    console.log(products);
    return products;

  }
}


/**
 * Render list of products
 * @param  {Array} products
 */
const renderProducts = products => {
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  div.classList.add('container');
  const template = 
  //'<div class="product" id=idcol> <span>Product ID</span><a>Product link</a><span>Product price (in €)</span><label class="input-check">favorite checkbox</label></div> '
  products
    .map(product => {
      return `
      <div class="product" id=${product._id}>
        <img src="${product.photo}" style="border-radius:10px 10px 0px 0px" id="${product.name}_photo">
        <span style="font-style:italic">${product.brand}</span>
        <br>
        <a href="${product.link}" target="_blank">${product.name}</a>
        <span>${product.price} €</span>
        <label class="input-check"><input type="checkbox" 
        id=id${product._id}> favorite </label>
        <label for="id${product._id}" class="icon-label"><i class="fas fa-check"></i></label>
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
  const {count} = pagination;
  const {currentPage, pageCount} = pagination;
  if (currentPage == 0) {
    pagination.currentPage =1;
    currentPage =1;
  }
  const options = Array.from(
    {'length': pageCount},
    (value, index) => `<option value="${index + 1}">${index + 1}</option>`
  ).join('');
  (async () => {
  const totalproducts = await fetchProducts(1, count);


  selectPage.innerHTML = options;
  selectPage.selectedIndex = currentPage - 1;
  const Brands = totalproducts.result.map(x=>x['brand']);

  var Brands_set = new Set(Brands);
  var Brandnames = Array.from(Brands_set);
  var brandvalue = selectBrand.value;
  const Brandsoptions = `<option value="All">All</option>` + Array.from(
    {'length': Brandnames.length},
    (value, index) => `<option value="${Brandnames[index]}">${Brandnames[index]}</option>`
  ).join('');
  selectBrand.innerHTML = Brandsoptions;

  if(Brands_set.size == 1) {selectBrand.selectedIndex = 1;}

  else {for (var i=0; i<Brandnames.length;i++){

    if(Brandnames[i] == brandvalue) {
      selectBrand.value = Brandnames[i];
      }
  
    }


  }

})();

  

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



// Allow to fill all values corresponding to API datas.
const renderIndicators = pagination => {
  const {count} = pagination;
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
  console.log(pagination);
};

/**
 * Declaration of all Listeners
 */

/**
 * Select the number of products to display
 * Feature 0
 */
selectShow.addEventListener('change', async (event) => {
  const {count} = currentPagination;
  const Allproducts = await fetchProducts(1, count);
  var totalproducts = Allproducts.result;

  // Check if Reasonable is checked
  var checked = document.querySelector('#reasonable_check:checked') !== null;
  if (checked) {
    totalproducts = totalproducts.filter(obj => obj['price'] <50);
    }
  //Check if Recent is checked
  checked = document.querySelector('#recent_check:checked') !== null;
  if (checked) {
    totalproducts = totalproducts.filter(New_released);
    }

  //Check product brands
  if (selectBrand.value != 'All') {
    const Brandlist = [...totalproducts];
    totalproducts =[];
    for (var i=0;i<Brandlist.length;i++) {
      if (Brandlist[i]['brand'] == selectBrand.value) {totalproducts.push(Brandlist[i]);}
    }
  }

  //Check for sorted data
  if (sorting.value == 'price-asc') {
    totalproducts = Sorting(totalproducts);
  }

  if (sorting.value == 'price-desc') {
    totalproducts = Sorting_inverse(totalproducts);
  }

  if (sorting.value == 'date-asc') {
    totalproducts = Sorting_date_inverse(totalproducts);
  }

  if (sorting.value == 'date-desc') {
    totalproducts = Sorting_date(totalproducts);
  }


  currentPagination.pageSize = parseInt(event.target.value);

  currentPagination.pageCount = Math.ceil(totalproducts.length/parseInt(event.target.value));
  if (currentPagination.currentPage>currentPagination.pageCount) {
    currentPagination.currentPage = currentPagination.pageCount;
  }

  var final_prods = chosen_prods(totalproducts);
  final_prods = {'result': final_prods, 'meta': currentPagination};
  setCurrentProducts(final_prods, currentPagination);
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

  const {count} = currentPagination;
  const Allproducts = await fetchProducts(1, count);
  const {pageSize} = currentPagination;
  var totalproducts = Allproducts.result;

   // Check if Reasonable is checked
  var checked = document.querySelector('#reasonable_check:checked') !== null;
  if (checked) {
    totalproducts = totalproducts.filter(obj => obj['price'] <50);
    }
    

  //Check if Recent is checked
  checked = document.querySelector('#recent_check:checked') !== null;
  if (checked) {
    totalproducts = totalproducts.filter(New_released);
    }
  currentPagination.currentPage = parseInt(event.target.value);
  
  //Check product brands
  if (selectBrand.value != 'All') {
    var Brandlists = [...totalproducts];
    totalproducts = [];
    console.log(selectBrand.value);
    console.log(Brandlists);
    for (var i=0;i<Brandlists.length;i++) {
      if (Brandlists[i]['brand'] == selectBrand.value) {totalproducts.push(Brandlists[i]);}
    }
  }

  //Check for sorted data
  if (sorting.value == 'price-asc') {
    totalproducts = Sorting(totalproducts);
  }

  if (sorting.value == 'price-desc') {
    totalproducts = Sorting_inverse(totalproducts);
  }

  if (sorting.value == 'date-asc') {
    totalproducts = Sorting_date_inverse(totalproducts);
  }

  if (sorting.value == 'date-desc') {
    totalproducts = Sorting_date(totalproducts);
  }

  var final_prods = chosen_prods(totalproducts);
  final_prods = {'result': final_prods, 'meta': currentPagination};
  setCurrentProducts(final_prods, currentPagination);
  render(currentProducts, currentPagination);

  sorting.selectedIndex = 0;
});

/**
 * Filtering by brands
 * Feature 2
 */ 
  
selectBrand.addEventListener('change', async (event) => {
  const {count} = currentPagination;
  const Allproducts = await fetchProducts(1, count);
  const {pageSize} = currentPagination;
  var totalproducts = Allproducts.result;
  if (event.target.value != 'All') {
    var Brandlist = [];
    for (var i=0;i<totalproducts.length;i++) {
      if (totalproducts[i]['brand'] == event.target.value) {Brandlist.push(totalproducts[i]);}
    }

    // Check if Reasonable is checked
    var checked = document.querySelector('#reasonable_check:checked') !== null;
    if (checked) {
      Brandlist = Brandlist.filter(obj => obj['price'] <50);
      }
    

    //Check if Recent is checked
    checked = document.querySelector('#recent_check:checked') !== null;
    if (checked) {
      Brandlist = Brandlist.filter(New_released);
    }

    //Check for sorted data
    if (sorting.value == 'price-asc') {
      Brandlist = Sorting(Brandlist);
    }
  
    if (sorting.value == 'price-desc') {
      Brandlist = Sorting_inverse(Brandlist);
    }
  
    if (sorting.value == 'date-asc') {
      Brandlist = Sorting_date_inverse(Brandlist);
    }
  
    if (sorting.value == 'date-desc') {
      Brandlist = Sorting_date(Brandlist);
    }
    //Update page informations
    currentPagination.pageCount = Math.ceil(Brandlist.length/currentPagination.pageSize);
    if (currentPagination.currentPage>currentPagination.pageCount) {
      currentPagination.currentPage = currentPagination.pageCount;
    }  
    var Brand_prods = chosen_prods(Brandlist);

    var Brandobj = {'result': Brand_prods, 'meta': currentPagination}
    setCurrentProducts(Brandobj, currentPagination);
  
  } else {
    console.log(currentPagination);

    // Check if Reasonable is checked
    var checked = document.querySelector('#reasonable_check:checked') !== null;
    if (checked) {
      totalproducts = totalproducts.filter(obj => obj['price'] <50);
      }

    //Check if Recent is checked
    checked = document.querySelector('#recent_check:checked') !== null;
    if (checked) {
      totalproducts = totalproducts.filter(New_released);
    }

    //Check for sorted data
    if (sorting.value == 'price-asc') {
      totalproducts = Sorting(totalproducts);
    }
  
    if (sorting.value == 'price-desc') {
      totalproducts = Sorting_inverse(totalproducts);
    }
  
    if (sorting.value == 'date-asc') {
      totalproducts = Sorting_date_inverse(totalproducts);
    }
  
    if (sorting.value == 'date-desc') {
      totalproducts = Sorting_date(totalproducts);
    }

    //update the site informations
    if (totalproducts.length > 0) {
      currentPagination.pageCount = Math.ceil(totalproducts.length/currentPagination.pageSize);
    }
    else {
      currentPagination.pageCount = Math.ceil(totalproducts.length/pageSize);
      console.log(totalproducts);

    }
    if (currentPagination.currentPage>currentPagination.pageCount) {
      currentPagination.currentPage = currentPagination.pageCount;
    } 
    var Brand_prods = chosen_prods(totalproducts);
 
    var Brandobj = {'result': Brand_prods, 'meta': currentPagination}

    setCurrentProducts(Brandobj, currentPagination);
  }

  console.log(currentPagination);

  render(currentProducts, currentPagination);

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
  const {count} = currentPagination;
  const{pageSize} = currentPagination;
  const Allproducts = await fetchProducts(1, count);
  var totalproducts = Allproducts.result;

  if (checked) {
    
    totalproducts = totalproducts.filter(New_released);
    

    //Check if Reasonable is checked
    checked = document.querySelector('#reasonable_check:checked') !== null;
    if (checked) {
      totalproducts = totalproducts.filter(obj => obj['price'] <50);
    }

    //Check product brands
    if (selectBrand.value != 'All') {
      var Brandlists = [...totalproducts];
      totalproducts = [];
      for (var i=0;i<Brandlists.length;i++) {
        if (Brandlists[i]['brand'] == selectBrand.value) {totalproducts.push(Brandlists[i]);}
      }
    }

    //Check for sorted data
    if (sorting.value == 'price-asc') {
      totalproducts = Sorting(totalproducts);
    }
  
    if (sorting.value == 'price-desc') {
      totalproducts = Sorting_inverse(totalproducts);
    }
  
    if (sorting.value == 'date-asc') {
      totalproducts = Sorting_date_inverse(totalproducts);
    }
  
    if (sorting.value == 'date-desc') {
      totalproducts = Sorting_date(totalproducts);
    }
    
    //Update page informations
    if (currentPagination.currentPage>Math.ceil(totalproducts.length /pageSize)) {
      currentPagination.currentPage = Math.ceil(totalproducts.length/pageSize)
    }
    currentPagination.pageCount = Math.ceil(totalproducts.length/pageSize);
    var Recent_prods = chosen_prods(totalproducts);

    Recent_prods = {'result': Recent_prods, 'meta': currentPagination};
    setCurrentProducts(Recent_prods, currentPagination);

  }
  else {

    // Check if Reasonable is checked
    var checked = document.querySelector('#reasonable_check:checked') !== null;
    if (checked) {
      totalproducts = totalproducts.filter(obj => obj['price'] <50);
      }
    
    //Check product brands
    if (selectBrand.value != 'All') {
      var Brandlists = [...totalproducts];
      totalproducts = [];
      for (var i=0;i<Brandlists.length;i++) {
        if (Brandlists[i]['brand'] == selectBrand.value) {totalproducts.push(Brandlists[i]);}
      }
    }

    //Check for sorted data
    if (sorting.value == 'price-asc') {
      totalproducts = Sorting(totalproducts);
    }
  
    if (sorting.value == 'price-desc') {
      totalproducts = Sorting_inverse(totalproducts);
    }
  
    if (sorting.value == 'date-asc') {
      totalproducts = Sorting_date_inverse(totalproducts);
    }
  
    if (sorting.value == 'date-desc') {
      totalproducts = Sorting_date(totalproducts);
    }

    //Update Page informations
    if (totalproducts.length > 0) {
      currentPagination.pageCount = Math.ceil(totalproducts.length/currentPagination.pageSize);
    }
    else {
      currentPagination.pageCount = Math.ceil(totalproducts.length/pageSize);
      console.log(totalproducts);

    }
    if (currentPagination.currentPage>currentPagination.pageCount) {
      currentPagination.currentPage = currentPagination.pageCount;
    } 
    var Recent_prods = chosen_prods(totalproducts);
 
    var Prods = {'result': Recent_prods, 'meta': currentPagination}
    console.log(Prods);

    setCurrentProducts(Prods, currentPagination);    
  }

    render(currentProducts, currentPagination);

}) 


/**
 * Filtering by reasonable product (price<50)
 * Feature 4
 */ 
reasonable.addEventListener('change', async function()  {
  var checked = document.querySelector('#reasonable_check:checked') !== null;
  const {count} = currentPagination;
  const{pageSize} = currentPagination;
  const Allproducts = await fetchProducts(1, count);
  var totalproducts = Allproducts.result;

  if (checked) {
    
    totalproducts = totalproducts.filter(obj => obj['price'] <50);
    

    //Check if Recent is checked
    checked = document.querySelector('#recent_check:checked') !== null;
    if (checked) {
      totalproducts = totalproducts.filter(New_released);
    }

    //Check product brands
    if (selectBrand.value != 'All') {
      var Brandlists = [...totalproducts];
      totalproducts = [];
      console.log(selectBrand.value);
      console.log(Brandlists);
      for (var i=0;i<Brandlists.length;i++) {
        if (Brandlists[i]['brand'] == selectBrand.value) {totalproducts.push(Brandlists[i]);}
      }
    }

    //Check for sorted data
    if (sorting.value == 'price-asc') {
      totalproducts = Sorting(totalproducts);
    }
  
    if (sorting.value == 'price-desc') {
      totalproducts = Sorting_inverse(totalproducts);
    }
  
    if (sorting.value == 'date-asc') {
      totalproducts = Sorting_date_inverse(totalproducts);
    }
  
    if (sorting.value == 'date-desc') {
      totalproducts = Sorting_date(totalproducts);
    }

    //Update page informations
    if (currentPagination.currentPage>Math.ceil(totalproducts.length /pageSize)) {
      currentPagination.currentPage = Math.ceil(totalproducts.length/pageSize)
    }
    currentPagination.pageCount = Math.ceil(totalproducts.length/pageSize);
    const Reas_prods = chosen_prods(totalproducts);

    var ReasProducts = {'result': Reas_prods, 'meta': currentPagination};
    setCurrentProducts(ReasProducts, currentPagination);

  }
  else {

    //Check if Recent is checked
    checked = document.querySelector('#recent_check:checked') !== null;
    if (checked) {
      totalproducts = totalproducts.filter(New_released);
    }

    //Check product brands
    if (selectBrand.value != 'All') {
      console.log(totalproducts);
      var Brandlists = [...totalproducts];
      totalproducts = [];
      console.log(selectBrand.value);
      console.log(Brandlists);
      for (var i=0;i<Brandlists.length;i++) {
        if (Brandlists[i]['brand'] == selectBrand.value) {totalproducts.push(Brandlists[i]);}
      }
    }

    //Check for sorted data
    if (sorting.value == 'price-asc') {
      totalproducts = Sorting(totalproducts);
    }
  
    if (sorting.value == 'price-desc') {
      totalproducts = Sorting_inverse(totalproducts);
    }
  
    if (sorting.value == 'date-asc') {
      totalproducts = Sorting_date_inverse(totalproducts);
    }
  
    if (sorting.value == 'date-desc') {
      totalproducts = Sorting_date(totalproducts);
    }


    //Update Page informations
    if (totalproducts.length > 0) {
      currentPagination.pageCount = Math.ceil(totalproducts.length/currentPagination.pageSize);
    }
    else {
      currentPagination.pageCount = Math.ceil(totalproducts.length/pageSize);
      console.log(totalproducts);

    }
    if (currentPagination.currentPage>currentPagination.pageCount) {
      currentPagination.currentPage = currentPagination.pageCount;
    }  
    const Reas_prods = chosen_prods(totalproducts);

    var Prods = {'result': Reas_prods, 'meta': currentPagination}
    console.log(Prods);

    setCurrentProducts(Prods, currentPagination);    
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
  }

  if (event.target.value == 'price-desc') {
    var SortedPriceH = Sorting_inverse(currentProducts);
    var Products = {'result': SortedPriceH, 'meta': currentPagination};
  }

  if (event.target.value == 'date-asc') {
    var SortedDateL = Sorting_date_inverse(currentProducts);
    var Products = {'result': SortedDateL, 'meta': currentPagination};
  }

  if (event.target.value == 'date-desc') {
    var SortedDateH = Sorting_date(currentProducts);
    console.log(SortedDateH);
    var Products = {'result': SortedDateH, 'meta': currentPagination};
  }

  setCurrentProducts(Products, currentPagination);
  render(currentProducts, currentPagination);
});



fav.addEventListener('change', async function()  {
  var checked = document.querySelector('#favorite:checked') !== null;

  if (checked) { //Monitor if favorite button is checked
    for (var i=0;i<currentProducts.length;i++){
      var checked_prod = document.querySelector('#id'+currentProducts[i]._id+':checked') !== null // Verify if each product's specific checkbox is checked
      if(checked_prod){
        var stringified = favorite_prods.map(function(obj) {return JSON.stringify(obj)}) // To make equality check of complex objects
        if(!stringified.includes(JSON.stringify(currentProducts[i]))) { // If an element was checked but not in the list, it is added.
          favorite_prods.push(currentProducts[i])
        }
      } else {
        var stringified = (typeof stringified === 'undefined') ? [] : stringified; 
        var stringified = favorite_prods.map(function(obj) {return JSON.stringify(obj)})
        if( stringified.includes(JSON.stringify(currentProducts[i]))) { // If a non checked object is in the list => it is deleted
          const index = stringified.indexOf(JSON.stringify(currentProducts[i]));
          stringified.splice(index, 1);
          favorite_prods = stringified.map(function(obj) {return JSON.parse(obj)})
        }
      } 
    }
    var Favprods = {'result': favorite_prods, 'meta': currentPagination};
    setCurrentProducts(Favprods, currentPagination);
  }

  else {
    console.log('oui');
    const products = await fetchProducts(currentPagination.currentPage, currentPagination.pageSize);
    setCurrentProducts(products);
  }
  render(currentProducts, currentPagination);

});

