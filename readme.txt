Style Guides:
HTML5/ CSS: Google
Javascript: Airbnb
Angular: Todd Motto

StartUp:
Mongo Executables:
cd C:\program files\mongodb\server\3.2\bin

Local mongo server (now using MongoLab):
mongod --dbpath C:\Users\Tyler\WebstormProjects\stork-delivery\data

Features:
1. Favorites List

2. Cart
    - Add
    - Remove
    - Specify Quantity
3. Products


TODO:
1. Convert quantity text inputs to select inputs
    - Quantity range: 1- inventory quantity

3. Tally price total in cart
4. Use ngMessages/ $error property to display validation messages on register form
5*. Setup pagination for productsListView, cartView, dealView
6*. Image upload for products
7*. Import product data from excel
8*. Create checkout component
9. Separate components into appropriate modules
10. Implement payment system (paypal?)


Completed:
Validate addCart (unique product) prior to sending server request
Refactor cart:post to split out adding and removing items
Refactor CartFactory.removeCart to use id rather than index
Send message response if user tries to add items to cart when not logged in
Set navigation li ng-class = 'active' when clicked

Cards:
ui-sref-active
ng-class - complex format ex. ng-class = [item, {active: isActive, special: isSpecial}]