# Movies Explorer API

<img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" target="_blank"><img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"><img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white">

# Usages

### Install
```
~/: git clone https://github.com/HanmaDaiki/movies-explorer-api
~/: cd movies-explorer-api
~/: npm install
```
And you need [MongoDB](https://www.mongodb.com/docs/manual/installation/)

### DevMod -- Hot Reloader

This mod start server with nodemo - Node Monitor!

```
~/: npm run dev
```

### Simple Run

Start server

```
~/: npm run start
```

### Start MongoDB

```
~/: mongod
```

# About 

This API was created for my diploma on the Yandex Practicum course.
It is used for Authorization on the portal "Movies Explorer".

This project has endpoins: 

```
POST /signin - used to login on the portal
  body: email, password, name
POST /signup - used to registration on the portal
  body: email, password

GET /users/me - used to get data about the current user
PATCH /users/me -  used to update data about the current user
  body: email, name

GET /movies - used to return all saved movies of the current user
POST /movies - used to add movies to the current user's collection
  body: country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
DELETE /movise/:id - used to delete movies from collection of the current user
```


# API LINK 
https://api.daikihanma.films.nomoredomains.icu/api
