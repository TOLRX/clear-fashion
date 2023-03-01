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

// instantiate the selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts');
const selectBrand = document.querySelector('#brand-select');
const recent = document.querySelector('#recent_check');
const reasonable = document.querySelector('#reasonable_check');


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
  const template = products
    .map(product => {
      return `
      <div class="product" id=${product.uuid}>
        <span>${product.brand}</span>
        <a href="${product.link}">${product.name}</a>
        <span>${product.price}</span>
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
const renderIndicators = pagination => {
  const {count} = pagination;

  spanNbProducts.innerHTML = count;
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
});

document.addEventListener('DOMContentLoaded', async () => {
  const products = await fetchProducts();

  setCurrentProducts(products);

  render(currentProducts, currentPagination);
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
}) 
     

