const express = require('express')
const app = express()
const exphbs = require('express-handlebars');
const PORT = process.env.PORT || 3000
const db = require('./models')

app.use(express.static('assets'))

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => res.render('home'))


db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});