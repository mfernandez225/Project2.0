const express = require('express')
const app = express()
const exphbs = require('express-handlebars');
// eslint-disable-next-line no-undef
const PORT = 3000
const db = require('./models')
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.use(express.static('assets'))

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => res.render('home'))
require("./routes/api-routes.js")(app);

/* The {force:true} will create a new table every time, erasing all data. 
USE THIS INITIALLY, LOAD UP YOUR DATABASE WITH ANY METHOD. 

YOU MAY ONLY CONTINUE WITH THIS WHEN THE DATABASE HAS NO VALUE. 
*/
db.sequelize.sync({
    force: false
}).then(function() {
    app.listen(PORT, () => {
        console.log(`Project 2.0 is listening at http://localhost:${PORT}`)
    })
})