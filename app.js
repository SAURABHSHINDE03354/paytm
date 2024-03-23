const express = require('express');
const a=require('./db');
const mainRouter = require('./routes/index');
const cors = require('cors');
const app = express()

const port=4000
// const { Long } = require('mongodb');

app.use(cors())
app.use(express.json())


app.use('/api/v1',mainRouter)


app.listen(port,()=>{
    console.log(`app listening on the port ${port}...`);
})