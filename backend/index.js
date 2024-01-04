const connectToMongo = require('./db');
var cors = require('cors')

const express = require('express')
const app = express()
const port = 5000;

app.get('/', (req, res) => {
  res.send('Hello anku!')
})

app.use(express.json()); //its a middleware if u want to use req.body
app.use(cors())

//Available routes
app.use('/api/auth', require('./routes/auth'));

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})


connectToMongo();