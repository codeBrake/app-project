let favorites = []
let listName = "Austin's"

let id = 0
//!!!!!! SERVER SIDE !!!!!!!!
module.exports = {
    createFavorites:(req, res) => {
        favorites.push({ ...req.body, id});
        id++
        res.status(200).send(favorites);
    },
    readFavorites:(req, res) => {
        res.status(200).send(favorites)
    },
    updateFavorite:(req, res) => {
        let {name} = req.body
        listName = name
        res.status(200).send(listName)
           
    },
    listName:(req, res) => {
        res.status(200).send(listName)
    },
    deleteFavorites:(req, res) => {
        const deleteId = req.params.id;
        let favoriteIndex = favorites.findIndex(favorite => favorite.id == deleteId);
        favorites.splice(favoriteIndex, 1);
        res.status(200).send(favorites);
    }
}




