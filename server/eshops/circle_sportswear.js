const fetch = require('node-fetch');
const cheerio = require('cheerio');

/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = data => {
  const $ = cheerio.load(data);
  console.log('INTERRESSANT')  
  //console.log($('.grid__item .card-information .price .price__container .price__regular .price-item.price-item--regular .money').text());
  return $('.grid__item')
  .slice(0,-3)
    .map((i, element) => {
      const name = $(element)
        .find('.full-unstyled-link')
        .text()
        .trim()
        .split('  ')[0]
        .slice(0,-1)
        .replace(/\s/g, ' ');
      const price = parseInt(
        $(element)
          .find('.card-information .price .price__container .price__regular .price-item.price-item--regular .money')
          .text()
          .replace(/€/, '')
      );
      var characteristic = $(element)
        .find('.card__characteristic')
        .text();
      const brand= "circle sportswear"; // We're scrapping in Dedicatedbrand website so, of course it come from them.

    characteristic = characteristic.substring(0,characteristic.length/2);
      console.log(characteristic);
      return {name, price, characteristic, brand};
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


