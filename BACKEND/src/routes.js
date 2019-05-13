const express = require('express')
const router = express.Router()
var cors = require('cors');

const users = require('./controllers/users.js')
const auth = require('./middleware/auth')
const recipes = require('./controllers/recipes.js')


router.all('*',cors());

router.get('/users', auth, users.getUser)
router.post('/users/login', users.login)
router.post('/users/logout', auth, users.logout)
router.post('/users', users.createUser)  // signup
router.patch('/users', auth, users.updateUser)
router.delete('/users', auth, users.deleteUser)

router.get('/recipes',recipes.getRecipes)
router.get('/recipes/userRecipes',auth,recipes.getUserRecipes)
router.get('/recipes/filter',recipes.getFilterRecipes)
router.get('/recipes/:id',recipes.getRecipe)
router.post('/recipes',auth,recipes.createRecipe)
router.patch('/recipes/:id',auth,recipes.updateRecipe)
router.delete('/recipes/:id', auth, recipes.deleteRecipe)

router.get('*', function(req, res) {
  res.send({
    error: 'This route does not exist, try /users or /todos'
  })
})

module.exports = router

