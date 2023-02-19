const dotenv = require("dotenv");
const connectDB = require("./config/db")
const express = require('express')
const app = express()
app.use(express.json())
dotenv.config()

connectDB();

// http://localhost:3001/api/course/

const { //users
    createUser,
    getUser,
    getFilterUser,
    updateUser,
    deleteUser
} = require('./controllers/usersController');

const { //ads
    createAds,
    getAds,
    getFilterAds,
    updateAds,
    deleteAds
} = require("./controllers/adsController")

app.post('/api/user', createUser);
app.get('/api/user', getUser);
app.get('/api/user/filter', getFilterUser);
app.put('/api/user/:id', updateUser)
app.delete('/api/user/:id', deleteUser)

app.post('/api/ads', createAds);
app.get('/api/ads', getAds);
app.get('/api/ads/filter', getFilterAds);
app.put('/api/ads/:id', updateAds)
app.delete('/api/ads/:id', deleteAds)

app.listen(process.env.PORT, ()=> {
    console.log(`Server is running on PORT ${process.env.PORT}`)
});