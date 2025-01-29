console.log("this is a first beckend development using express farmework")

const express = require('express');
const path = require('path')
const fs = require('fs')
const app = express();
const port = 80;

// Serving static files
app.use('/static', express.static('static'))
app.use(express.urlencoded())

// Set the template engine as pug
app.set('view engine', 'pug')

// Set the views directory
app.set('views', path.join(__dirname, "pub"))



// Our pug demo endpoint
app.get('/', (req, res) => {
    let contant = 'login form here for the user'
    let title = "Hay Hasnian"
    let params = { title: title, message: contant, }
    res.status(200).render('index', params)
})

app.get('/about', (req, res) => {
    fs.readFile('output.txt', 'utf-8', (err, data) => {
        if (err) {
            res.status(404).send('File not found')
        } else {
            res.send(data)
        }
    })
})

app.post('/', (req, res) => {
    console.log(req.body)
    let name = req.body.name
    let email = req.body.email
    let message = req.body.message

    const outPutData = `Name is ${name}, email is ${email}, message is ${message}`
    fs.writeFileSync('output.txt', outPutData)

    res.status(200).render("this is post request")
    let contant = 'You have successfully submitted the form!! Thank you enjoy the day!!!'
    let title = "Hay Hasnian"
    let params = { title: title, message: contant, }
    res.status(200).render('index', params)
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});