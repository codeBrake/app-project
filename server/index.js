const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 4200;
const fc = require('./favoritesController.js')
//!!!!!!! SERVER SIDE !!!!!!!!
app.use(bodyParser.json())

const favoritesBaseUrl = "/api/favorites";
app.post(favoritesBaseUrl, fc.createFavorites)

app.get(favoritesBaseUrl, fc.readFavorites)
app.get("/api/favorites/name", fc.listName)

app.put(favoritesBaseUrl, fc.updateFavorite)


app.delete(`${favoritesBaseUrl}/:id`, fc.deleteFavorites)

app.listen(port, () => {
    console.log('listening on port', port);
})