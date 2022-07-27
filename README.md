# Simple e-commerce pet-project 
SPA made with React, Redux, Typescript and SCSS.  
*You can use this application by the link https://vaskovskied.github.io/react-marketplace-pet/*
### Stack:
* React.js
* Redux toolkit
* react-router-dom
* TypeScript
* SASS
* axios
* Redux Persist (to store some redux store data in the local storage)

I used [fake store (RESTful) api](https://github.com/keikaavousi/fake-store-api) to get products for my project. Also I used [Big.js](https://github.com/MikeMcl/big.js) to handle counting problems.  

### There's three pages: 
1. Catalog page (homepage "/", "/:categoryName")
2. Product details page ("product/:productId")
3. Cart page ("product/cart")  

Firstly, you can choose category in the Catalog page and view it in the link. That give you possibility to share the link to the certain category page. Also you can choose sort type. Unfortunetely, [API I used](https://github.com/keikaavousi/fake-store-api) allows me to use only to sort types: ascending and descending. So you can choose one of them. Sort logic is stored in Redux `src/store/sortSlice`.  

You can click on a product and visit product details page or add it to cart directly from catalog page.  

When you choose what you want to buy, you can visit cart page. And you will see "loading..." message or (if you're lucky) error message. This is caused by special Redux async action `updateCart()` I created to handle situations where backend data can be change, but client will not see it.  
On this page you can increment or decrement product quantity or delete products. Also you can empty your cart. All of these actions are stored in Redux `src/store/cartSlice`. I used [Redux Persist](https://github.com/rt2zz/redux-persist) to store it in the local storage.
