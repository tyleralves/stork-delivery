Style Guides:
HTML5/ CSS: Google
Javascript: Airbnb
Angular: Todd Motto

StartUp:
Mongo Executables:
cd C:\program files\mongodb\server\3.2\bin

Local mongo server (now using MongoLab database):
mongod --dbpath C:\Users\Tyler\WebstormProjects\stork-delivery\data

Features:
1. Favorites List

2. Cart
    - Add
    - Remove
    - Specify Quantity
3. Products


TODO:
1. Validate addCart (unique product) prior to sending server request
2. Set navigation li ng-class = 'active' when clicked
3. Refactor cart:post to split out adding and removing items
4. Tally price total in cart
5. Learn mongo command line
    - Add deal to specific items using command line, or create products dashboard
6. DealsController: More efficient to check whether productList array already exists (ie: user already visited productList page),
    then only use ProductFactory.getProducts() (http request) if not
    - Better to just use ProductList component altogether
7. Refactor CartFactory.removeCart to use id rather than index                    ---> NOW
8. Send message response if user tries to add items to cart when not logged in