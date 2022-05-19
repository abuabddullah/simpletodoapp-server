const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const jwt = require('jsonwebtoken');


const app = express()
const port = process.env.PORT || 5000;


// const corsConfig = {
//   origin: true,
//   credentials: true,
// }
// app.use(cors(corsConfig))
// app.options('*', cors(corsConfig))



app.use(cors())
app.use(express.json())

// simpleTodoApp
// simpleTodoApp

const uri = "mongodb+srv://simpleTodoApp:simpleTodoApp@cluster0.tkgts.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




console.log(uri);

async function run() {
    try {
        await client.connect();
        const tasksCollection = client.db("todos").collection("task");


        console.log("Connected correctly to server");

        // adding or posting a tasks in the db
        app.post('/tasks', async (req, res) => {
            const newTask = req.body;
            console.log(newTask);
            const result = await tasksCollection.insertOne(newTask);
            res.send(result);
        })


        // Get all tasks of the db
        app.get('/tasks', async (req, res) => {
            const query = {};
            const cursor = tasksCollection.find(query);
            const result = await cursor.toArray();
            console.log(result);
            res.send(result);
        })


        // Delete a task
        app.delete('/tasks/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await tasksCollection.deleteOne(query);
            res.send(result);
        })


        // Get a task
        app.get('/tasks/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await tasksCollection.findOne(query);
            console.log(result);
            res.send(result);
        })

        // Update a task
        app.put('/tasks/:id', async (req, res) => {
            const id = req.params.id;
            const updateInfo = req.body;
            const filter = { _id: new ObjectId(id) };
            const update = { $set: updateInfo };
            const result = await tasksCollection.updateOne(filter, update);
            console.log(result);
            res.send(result);
        })


    } finally {

    }

}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Hello World! Its for CRUD Operations')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})