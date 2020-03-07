const express = require('express')
const app = express()
const exphbs = require('express-handlebars');
const db = require('./models')
const process = require("process")

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static('assets'))
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => res.render('home'))
require("./routes/api-routes.js")(app);

db.sequelize.sync().then(function () {
    app.listen(process.env.PORT || "3000", () => {
        console.log(`Project 2.0 is listening at http://localhost:${process.env.PORT || "3000"}`)
    })
})
