const express = require('express')
const app = express()
const exphbs = require('express-handlebars');
const port = 3000

app.use(express.static('assets'))

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => res.render('home'))

app.listen(port, () => console.log(`Project 2.0 is listening at http://localhost:${port}`))
