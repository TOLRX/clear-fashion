const fetch = require('node-fetch');
const cheerio = require('cheerio');

/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = data => {
  const $ = cheerio.load(data);
  return $('.products-list .product-miniature')

    .map((i, element) => {
      const name = $(element)
        .find('.product-miniature__title')
        .text()
        .trim()
        .replace(/\s/g, ' ');
      const price = parseInt(
        $(element)
          .find('.product-miniature__pricing .price')
          .text()
      );
      const color = $(element)
        .find('.product-miniature__color')
        .text()
        .trim()
        .replace(/\s/g, ' '); // Replace space synthax of html per real spaces.
      const brand= "monlimart"; // We're scrapping in Dedicatedbrand website so, of course it come from them.
      const released = null; // No date available on the website
      const link = $(element)
        .find('.product-miniature__title .text-reset')
        .attr('href');
      const photo = $(element)
        .find('.product-miniature__thumb-link img')
        .attr('data-src');
      return {name, price, color, brand, released, link, photo};
    })
    .get(); 
}; 



/**
 * Scrape all the products for a given url page
 * @param  {[type]}  url
 * @return {Array|null}
 */
module.exports.scrape = async url => {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const body = await response.text();

      return parse(body);
    }

    console.error(response);

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};


