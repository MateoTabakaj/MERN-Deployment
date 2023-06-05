const express = require('express');
const cors = require('cors');
const socket = require('socket.io')
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());                           /* This is new and allows JSON Objects to be posted */
app.use(express.urlencoded({ extended: true }));   /* This is new and allows JSON Objects with strings and arrays*/
require('./config/mongoose.config');


app.use(express.json(), express.urlencoded({ extended: true }));

// const AllMyProductRoutes=require("./routes/product.routes")
const AllMyPetRoutes = require('./routes/pet.routes')
AllMyPetRoutes(app);
/* This is new */
require('./routes/pet.routes')(app);
const server = app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
});


const io = socket(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        allowedHeaders: ['*'],
        credentials: true,
    }
});

io.on("connection", socket => {
    // NOTE: Each client that connects get their own socket id!
    // if this is logged in our node terminal, that means we a new client
    //     has successfully completed the handshake!
    console.log('Nice to meet you.(shake hand)');

    // We add our additional event listeners right inside this function
    // NOTE: "connection" is a BUILT IN events listener
    socket.emit("toclient",console.log("welcome"))
});