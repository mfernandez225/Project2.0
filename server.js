const express = require('express')
const app = express()
const exphbs = require('express-handlebars');
// eslint-disable-next-line no-undef
const PORT = process.env.DB_PORT || 3306
const db = require('./models')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('assets'))

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => res.render('home'))


db.sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});