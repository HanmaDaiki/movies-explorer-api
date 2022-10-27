# Movies Explorer API

# Usage

### Install
```
git clone https://github.com/HanmaDaiki/movies-explorer-api
cd movies-explorer-api
npm install
```

### DevMod -- Hot Reloader

This mod start server with nodemo - Node Monitor!

```
npm run dev
```

### Simple Run

Start server

```
npm run start
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
