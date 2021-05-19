//Imports
import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from 'pusher';
import cors from 'cors';

//Configs
const app = express();
const port = process.env.Port || 9000

const pusher = new Pusher({
    appId: "1206508",
    key: "ff29f78faf7a19fe1565",
    secret: "98c79465d5ac9a6dcb1e",
    cluster: "ap2",
    useTLS: true
  });
// middleware
app.use(express.json());
app.use(cors());


// DB Config 
const connection_url = 'mongodb+srv://admin:admin@cluster0.ubo9r.mongodb.net/whatsappdb?retryWrites=true&w=majority';
mongoose.connect(connection_url , {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection
db.once('open' , () =>{
    // console.log('DB Connected');

    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch(); 
    changeStream.on('change' , (change) =>{
        console.log(change);
        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger("messages" , "inserted" , {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timeStamp,
                received: messageDetails.received,
            });
        } else{
            console.log('error in pusher timings')
        }
    });
});



// api routes
app.get('/' , (req , res) =>{
    res.status(200).send('Heloo World');
})

app.get('/messages/sync' , (req , res) =>{
    Messages.find((err , data) =>{
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        } 
    });
});

app.post('/messages/new' , (req, res) =>{
    const dbMessage = req.body

    Messages.create(dbMessage , (err , data) =>{
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

// Listen
app.listen(port , () => {
    console.log(`Listening on Port ${port}`);
})