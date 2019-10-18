NorthCoders News API
Description
This is an API for interacting with my Northcoders news app. The database is PSQL and interactions are made using K'nex. The news app itself consists of tables for differnt topics, users, articles and comments and various endpoints are available for interaction with these tables.

Link
https://john-rowan-news.herokuapp.com/api/articles

Cloning and installing
First, clone the repo:

git clone https://github.com/Jrowan19/NC-NEWS

cd NC-News
On GitHub if you want your own repository for this project go ahead and set that up before running:

git remote remove origin

git remote add origin <YOUR-GITHUB-URL>
The following dependencies are provided for you:

express ^4.17.1
knex ^0.19.0
pg ^7.11.0
So you can go ahead and run

npm install
There is one other file you're going to need to create yourself before we can start creating and seeding our databases. So first you need a new file in the root directory called exactly 'knexfile.js'. The content of this file should look as follows:

If this is your first time using psql please first refer to psql-setup.md

const ENV = process.env.NODE_ENV || 'development';
const { DB_URL } = process.env;

const baseConfig = {
client: 'pg',
migrations: {
directory: './db/migrations'
},
seeds: {
directory: './db/seeds'
},
migrations: {
directory: './db/migrations'
}
};

const customConfig = {
production: {
connection: `${DB_URL}?ssl=true`
},
development: {
connection: {
database: 'nc_news',
user: '<YOUR-PG-USERNAME-HERE>', // LINUX ONLY
password: '<YOUR-PG-PASSWORD-HERE>' // LINUX ONLY
}
},
test: {
connection: {
database: 'nc_news_test',
user: '<YOUR-PG-USERNAME-HERE>', // LINUX ONLY
password: '<YOUR-PG-PASSWORD-HERE>' // LINUX ONLY
}
}
};

module.exports = { ...customConfig[ENV], ...baseConfig };
Setting up and seeding databases
Once those dependencies have been installed we can go ahead and setup our databases:
npm run setup-dbs
You now will have both development and test databases. Now to add all of our tables on our development and test databases respectively you can run:
npm run migrate-latest

npm run migrate-latest-test
You have two sets of data in the data folder. To populate your development and test databases respectively with this data you can run:
npm run seed

npm run seed-test
Okay, great! You should now have two databases complete with tables and data.
Testing
If you want to run the existing tests you will firsts need the follwing developer dependencies:

chai ^4.2.0
chai-sorted ^0.2.0
mocha ^6.1.4
supertest ^4.0.2
npm install chai chai-sorted mocha supertest -D
To run the tests you have the follwing existing scripts:

To run the app.js tests:
npm test
To run the tests for the function found in db/utils:
npm run test-utils
To run all tests together:
npm run all-tests
For visual testing I also used nodemon which can be installed by running:

npm install nodemon -D
and can be run using:

npm run dev
Other scripts
If you make changes and need to rollback your migrations you have the following available:
npm run migrate-rollback

npm run migrate-rollback-test

npm runmigrate-down-up
To start your server
npm start
Useful for seeding a production database hosted on heroku:
npm run seed:prod
Current Endpoints
For a full list of endpoints including example requests and responses please click here

Author
John Rowan
Acknowledgments
NorthCoders
