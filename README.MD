<h1 align="center">Pulsiq Realtime Chat Backend API</h1>

This API is created by me as personal project for portofolio that will be used as backend for my app, Pusliq. This API use Express as Nodejs framework and MySQL as store database. [More about Express](https://en.wikipedia.org/wiki/Express.js)

## Built With

[![Express.js](https://img.shields.io/badge/Express.js-5.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.23.x-green.svg?style=rounded-square)](https://nodejs.org/)

## Requirements

1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. Web Server (ex. localhost)

## How to run the app ?

1. Open app's directory in CMD or Terminal
2. Type `npm install`
3. Make new file a called **.env**, set up first [here](#set-up-env-file)
4. Copy .env.local content to new .env file by creating a new file .env first then copy a content from .env.local to new .env file.
5. Change a content on .env file with your custom configuration like database connection and JWT keys.
6. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
7. Create a database with the name #nama_database, and Import file sql to **phpmyadmin**
8. Open Postman desktop application or Chrome web app extension that has installed before
9. Choose HTTP Method and enter request url.(ex. localhost:3000/)
10. You can see all the end point [here](https://documenter.getpostman.com/view/14780095/2sBXihqscY)
11. Type `npm start` to activated the server.

## Feature

1. Login and Register API
2. Admin API :
   1. Users
3. User API :
   1. Messages
   2. Profile
   3. Contacts

## License

© [Muhammad Akbar Saladin Siregar](https://github.com/akbarsaladin36/)
