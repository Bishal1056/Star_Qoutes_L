//server.js
console.log('May node be with you')

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient 

MongoClient.connect('mongodb+srv://Bishal:Bishal1056@cluster0.j5kbe.mongodb.net/star-wars-quotes?retryWrites=true&w=majority',{useUnifiedTopology:
 true})
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')

    //using the EJS template engine
    app.set('view engine', 'ejs')

    //body parser before CRUD handlers
    app.use(bodyParser.urlencoded({extended: true}))
    //to read JSON 
    app.use (bodyParser.json())

    app.use(express.static('public'))

    //CRUD handlers
    app.get('/',(req,res) =>{
        db.collection('quotes').find().toArray()
        .then(results => {
        res.render('index.ejs',{ quotes: results}) 
        })
        .catch(error => console.error(error))

        //res.render('index.ejs',{})

        //res.sendFile(__dirname + '/index.html')
    })

    app.post('/quotes', (req,res) => {
        quotesCollection.insertOne(req.body)
        .then(result => {
            res.redirect('/')
        })
        .catch(error => console.error(error))
    })

    //handle the put request
    app.put('/quotes',(req,res) => {
        quotesCollection.findOneAndUpdate(
            {name: 'Yoda'},
            {
                $set: {
                    name: req.body.name,
                    quote:req.body.quote
                }
            },
            {
              upsert: true
            }
        )
        .then(result => {
            res.json('success')
        })
        .catch (error => console.error(error))

    })

    app.delete('/quotes', (req,res) => {
        quotesCollection.deleteOne(
            {name: req.body.name}
        )
        .then (result => {
            if (result.deletedCount === 0) {
                return res.json('No quote to delete')
            }
            res.json('Deleted Darth Vadar`s quote')
        })
        .catch(error => console.error(error))
    })

    app.listen(3000, function(){
        console.log('listening on 3000')
      })
  })
  .catch(error => console.error(error))


