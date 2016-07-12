Style Guides:
HTML5/ CSS: Google
Javascript: Airbnb
Angular: Todd Motto

StartUp:
Mongo Executables:
cd C:\program files\mongodb\server\3.2\bin

C:\Users\Tyler\WebstormProjects\stork-delivery\data\backup

Local mongo server (now using MongoLab):
mongod --dbpath C:\Users\Tyler\WebstormProjects\stork-delivery\data

Features:
1. Cart
    - Add
    - Remove
    - Specify Quantity
2. Products


TODO: ENV variables walmart api key, jwt secret

mongorestore -h ds049935.mlab.com:49935 -d heroku_cr9sj7df -u <user> -p <password> <input db directory>
Completed:
Query product data from Walmart API
Tally price total in cart
Convert ProductsList and Cart quantity text inputs to select inputs
    - Quantity range: 1- inventory quantity
Validate addCart (unique product) prior to sending server request
Refactor cart:post to split out adding and removing items
Refactor CartFactory.removeCart to use id rather than index
Send message response if user tries to add items to cart when not logged in
Set navigation li ng-class = 'active' when clicked

Cards:
ng: ui-sref-active
ng: ng-class - complex format ex. ng-class = [item, {active: isActive, special: isSpecial}]
mongoose: What does the following code do: MyModel.update({username: tyler}, {$set: {age: 26}});
        --> Returns a Query that can be executed to perform the update using .exec(callback)