const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();
const port = process.env.PORT || 5000

app.use(cors());
app.use(bodyParser.json());
const MongoClient = require('mongodb').MongoClient;
const { request } = require('express');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qxopl.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db(`${process.env.DB_NAME}`).collection("products");
  const boolCollection = client.db(`${process.env.DB_NAME}`).collection("booking");
  
  app.post('/addEvent',(req,res)=>{
    const newEvent = req.body;
    collection.insertOne(newEvent)
    .then(result=>{
        console.log('inserted count',result.insertedCount)
        res.send(result)
    })
  })




  app.post('/booking',(req,res)=>{
    const newEvent = req.body;
    collection.insertOne(newEvent)
    .then(result=>{
        console.log('inserted count',result.insertedCount)
        res.send(result)
    })
  })


  app.get('/products',(req,res)=>{
    collection.find({})
    .toArray((err,documents)=>{
      res.send(documents);
    })
  })

  app.get('/book/:id',(req,res)=>{
    collection.find({_id:ObjectId(req.params.id)})
    .toArray((err,documents)=>{
      res.send(documents);
    })
  })

  app.delete('/delete/:id',(req,res)=>{
    // console.log(req.params.id);
    collection.deleteOne({_id:ObjectId(req.params.id)})
    .then((result)=> {
      console.log(result.deleteCount);

    })
    
  })

  app.get('/', (req, res) => {
    res.send('Hello World! habi jabi')
  })
    
  // perform actions on the collection object
//   client.close();
});




app.listen(port)