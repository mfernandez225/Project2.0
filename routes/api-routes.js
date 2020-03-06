/* eslint-disable no-undef */
// var db = require("../models");
var mysql = require('mysql');
require('dotenv').config()
var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
});


module.exports = function(app) {
    app.get("/tickers", function(req, res) {
        connection.query('SELECT symbol from tickers where symbol like "%' + req.query.key + '%"', function(err, rows) {
            if (err) throw err;
            console.log(rows)
                // var data = [];
                // for (i = 0; i < rows.length; i++) {
                //     data.push(rows[i].symbol);
                // }
            var data = rows.map(rows => rows.symbol);
            console.log(data)
            res.end(JSON.stringify(data));
            // var query = {};
            // if (req.query.symbol) {
            //     query.symbol = req.query.symbol;
            // }
            // console.log(db)

            // findAll returns all entries for a table when used with no options
            // db.tickers.findAll({
            //     where: {
            //         query: {
            //             // eslint-disable-next-line no-undef
            //             [Op.like]: req.query.key
            //         }
            //     }
            // }).then(function(dbTickers) {

            //     console.log(dbTickers)
            //     var data = dbTickers.map(dbTickers => dbTickers.symbol)
            //     res.json(data);
        });
    });
}