# 👕 Clear Fashion 

👋 Salut utilisateur,

Bienvenue sur mon API de produits ! Voici tout ce que vous devez savoir :

📋 Commandes
Il y a deux commandes principales :

/products : cette commande affiche les 12 premiers produits disponibles dans notre base de données.
/product? : cette commande permet de filtrer les produits en fonction de plusieurs critères.

🔍 Filtrage
Pour utiliser la commande /product?, vous pouvez utiliser n'importe quel mot-clé pour filtrer les résultats de la manière suivante : paramètre=x. Voici quelques exemples :

‘size’ : Gérer le nombre de produit affiché.
‘total’ : Gérer le total de produit proposé par l'API.
‘brand’ : filtrer les produits par marque.
‘price’ : filtrer les produits par prix (étant inferieur au prix indiqué).
‘page’ : afficher une page spécifique de résultats, géré avec le paramètre size (ou total).
. . .

N'oubliez pas d'espacer chaque définition de paramètre par le caractère '&'.

=> API link : https://server-tau-taupe-69.vercel.app/

Maintenant que vous avez compris comment utiliser mon API de produits, je suis heureux de vous présenter mon site web d'achats de produits, qui utilise l'API précédente pour afficher les produits aux utilisateurs.

🛍️ Fonctionnalités
Mon site web propose les fonctionnalités suivantes :

- Affichage des produits disponibles à partir de notre API de produits.
- Tri des produits par date de sortie, poids, marque ou favoris.
- Affichage d'images des produits pour aider les utilisateurs à choisir les produits qu'ils souhaitent acheter.
- Redirection vers les sites concernés si les produits les intéressent.
- Design soigné et convivial pour une expérience utilisateur optimale.

=> Client app link : https://client-psi-snowy.vercel.app/ 

🙏 Remerciements
Je suis ravis de vous présenter mon site web d'achats de produits, et j'espère que vous apprécierez l'expérience utilisateur que j'ai créée pour vous.

⚠️ Il est possible que le format des titres soit bizarre, c'est un problème que j'ai rencontré en changeant de taille d'écran d'ordinateur car j'ai toujours travaillé sur un 15.6 pouces. C'est un problème que j'avais corrigé mais je n'ai pas pu le pull dans le github de référence car celui-ci n'autorisais plus les pull à partir d'une certaine date.

> What's the story behind each item of clothing you buy?

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [📱 Context](#-context)
- [🤔 Problems](#-problems)
- [🎯 Objective](#-objective)
- [🛣 How to solve it?](#%F0%9F%9B%A3-how-to-solve-it)
- [👩🏽‍💻 Step by step with Workshops](#%E2%80%8D-step-by-step-with-workshops)
- [🌱 Source and Inspiration](#-source-and-inspiration)
- [📝 Licence](#-licence)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 📱 Context

[Clear Fashion](https://www.clear-fashion.com/) is an iOS and Android application that allows you **to choose environmentally & human-friendly clothes**.

With Clear Fashion, you will get an analysis **with transparency and independency** of the commitments of brands according to 4 themes: Human, Health, Environment & Animals.


<img src="./docs/zara.png" width="45%"/> <img src="./docs/uniqlo.png" width="45%"/>

<img src="./docs/decathlon.png" width="45%"/> <img src="./docs/ask.png" width="45%"/>

<img src="./docs/top.png" width="45%"/> <img src="./docs/green-lion.png" width="45%"/>

## 🤔 Problems

Clear Fashion is particularly committed to ensuring that there are **no conflicts due to commercial interests**.

My problem is simple and time-consuming: **I cannot consult on the same page all the products of my favorite brands.**

I have to browse each e-shop brand to look for a product.

![Shops](./docs/shops.jpg)

## 🎯 Objective

**Build a web application to list my favorite top responsible Brands Products.**

## 🛣 How to solve it?

1. 👖 **Manipulate Products**: How to [manipulate](https://github.com/92bondstreet/javascript-empire/blob/master/themes/1.md#about-javascript) the products in the [browser](https://github.com/92bondstreet/javascript-empire/blob/master/themes/1.md#about-htmlcss)
2. 🧹 **Scrape Products**: How to [fetch](https://github.com/92bondstreet/javascript-empire/blob/master/themes/2.md#about-nodejs) Products from different website sources
3. 📱 **Render Products in the browser**: How to [interact](https://github.com/92bondstreet/javascript-empire/blob/master/themes/2.md#about-react) with the Products in the browser
4. 💽 **Save Products in database**: How to avoid to scrape again and again the same data
5. ⤵️ **Request Products with an api**: How to [give access](https://github.com/92bondstreet/javascript-empire/blob/master/themes/3.md#about-restful-and-graphql-api) to your data
6. 🐛 **Test your code**: How to [ensure quality](https://github.com/92bondstreet/javascript-empire/blob/master/themes/3.md#about-test-driven-development) and confidence
7. 🚀 **Deploy in production**: How to [give access](https://github.com/92bondstreet/javascript-empire/blob/master/themes/3.md#about-serverless) to anyone

## 👩🏽‍💻 Step by step with Workshops

![Maps](./docs/map.jpg)


With [javascript-empire](https://github.com/92bondstreet/javascript-empire#%EF%B8%8F-the-3-themes) themes, we'll follow next workshops to solve our problem:

| Step | Workshops | Planned Date
| --- | --- | ---
| 1 | [Manipulate data with JavaScript in the browser](./workshops/1-manipulate-javascript.md) | January 2023
| 2 | [Interact data with JavaScript, HTML and CSS in the browser again](./workshops/2-interact-js-css.md) | January 2023
| 3 | [Scrape data with Node.js](./workshops/3-scrape-node.md) | February 2023
| 4 | [Save data in a Database with MongoDB](./workshops/4-store-mongodb.md) | February 2023
| 5 | [Build an api with Express to request data](./workshops/5-api-express.md) | February 2023
| 6 | Test your code with Jest | March 2023
| 7 | [Deploy in production with Vercel](./workshops/7-deploy.md) | March 2023
| 8 | Render data with React | March 2023


## 🌱 Source and Inspiration

* [Clear Fashion](https://www.clear-fashion.com/)

## 📝 Licence

[Uncopyrighted](http://zenhabits.net/uncopyright/)
