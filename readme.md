# Super eindwerk

UI for backend is powered by Angular Js. Authorisation is done with
JWT. Communication is done with REST

users admin@cvo.be and student@cvo.be
both have password : secret

## Install

Edit .env or create .env with following parameters

        APP_ENV=local
        APP_DEBUG=true
        APP_KEY=<your_app_key>
        APP_URL=http://yourserverurl

        DB_HOST=127.0.0.1
        DB_PORT=3306
        DB_DATABASE=<your_db>
        DB_USERNAME=<your_db_username_>
        DB_PASSWORD=<your_db_user_password>

**Important note**
Add the secret recaptcha key for your domain to the .env file, and edit
public/scripts/controller blogDetailController.js

Edit line 34 
 
        vm.publicKey = "6LcElRsTAAAAAAbqNjvSNQbzhdblPkgRzREE2IoX";
        
And update it with your domain recaptcha public key. Optionally line 31
can be replaced with the public key of your local dev server.

Install Laravel dependencies ( order is important )

* npm install
* composer install

Install AngularJs dependencies

* cd public
* npm install
* bower install

Install and seed database

             php artisan migrate:refresh --seed
