import { Place } from './types/place';
import express from 'express';
import { mongoDb } from './db/mongoDb';
import { DB } from './db/db';
var bodyParser = require('body-parser')
const { v4: uuidv4 } = require('uuid');


const app = express();
const cors = require('cors')
app.use(cors())
app.use(express.json()); 

const port = 3002;
const Db: DB = new mongoDb()
app.use(bodyParser.urlencoded({
  extended: true
}));
app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Express!');
});

app.get('/api/place/:id', (req, res) => {
  const id = req.params.id;
  res.send(Db.get(id));
});

app.get('/api/getAll', async (req, res) => {
  console.log('getting all documents')
  const rVal = await Db.getAll()
  console.log(rVal)

  res.send(rVal);
});

app.post('/api/place', (req, res) => {
  const place = req.body;
  console.log(place)
  if(place != undefined ){// TODO add more null checks and typing
    console.log({...place , ID: uuidv4(), createTime: new Date().getTime()})
    Db.insert({...place , ID: uuidv4(), createTime: new Date().getTime()})
  }else{

  }

  res.send({res:'inserted place'});
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});