/* eslint-disable no-undef */
const db = require("../models");
const {
    Op
} = require("sequelize");

module.exports = function (app) {
    // This is how we told typeahead how to search for stock symbols and names
    app.get("/stocks", async (req, res) => {
        const stocks = await db.Stock.findAll({
            where: {
                [Op.or]: [{
                        symbol: {
                            [Op.like]: `%${req.query.key}%`
                        }
                    },
                    {
                        name: {
                            [Op.like]: `%${req.query.key}%`
                        }
                    }
                ]
            }
        });
        const symbols = stocks.map(stocks => stocks.symbol);
        res.end(JSON.stringify(symbols));
    });

    // Displays what the user has searched for
    app.get('/tracked-stocks', async (_req, res) => {
        const stocks = await db.TrackedStock.findAll();
        res.end(JSON.stringify(stocks));
    })
    // Creates a new tracked stock that the user inputs
    app.post("/tracked-stocks", (req, res) => {
        db.TrackedStock.create({
            symbol: req.body.symbol,
        }).then(function (trackedStock) {
            res.json(trackedStock);
        });
    })
    // Deletes from the database
    app.delete("/tracked-stocks/:symbol", (req) => {
        db.TrackedStock.destroy({
            where: {
                symbol: req.params.symbol
            }
        })
    })
}
