const hbs = require('hbs')
const path = require('path')
const express = require('express')
const forecast = require("./utils/forecast")

const port=process.env.PORT || 3000
const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render("index", {
        title: "home page",
        name: "hany elhamy"
    })
})
app.get('/help', (req, res) => {
    res.render("help", {
        title: "help page",
        name: "hany elhamy"
    })
})
app.get('/about', (req, res) => {
    res.render("about", {
        title: "about page",
        name: "hany elhamy"
    })
})

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Provide an address"
        })
    }
    console.log(req.query.address)


    forecast(req.query.address, (error, data) => {
        if (error) {
            return res.send({ error })
        }
        res.send({
            forecast: data,
            address: req.query.address
        }
        )
    })
})
    app.get("/products", (req, res) => {
        if (!req.query.search) {
            return res.send({ error: "Enter search term" })
        }

        res.send({
            search: req.query.search

        })

    })
    app.get('/help/*', (req, res) => {

        res.render("error",
            {
                title: "Error",
                error: "Help article not found",
                name: "hany elhamy"
            }
        )
    })
    app.get("*", (req, res) => {

        res.render("error",
            {
                title: "Error",
                error: "Page not found",
                name: "hany elhamy"
            }
        )
    })

    app.listen(port, () => {
        console.log(" server is up on port "+port)
    })
