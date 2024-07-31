const express = require("express");
const app = express();
const sequelize = require("./config/dbConnect");
const cloudinary = require("./config/cloudinaryConnect");
require("dotenv").config();
const cors = require("cors");
const router = require("./routes/router");
const fileupload = require("express-fileupload");
const { Server } = require("socket.io");
const http = require("http");

// Cloudinary connection
cloudinary.cloudinaryConnect();

// Create HTTP server and set up Socket.io
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    },
    credentials: true,
});

// Middleware
app.use(express.json());
app.use(cors());
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));
app.use('/api/v1', router);

io.on("connection", (socket) => {
    console.log("userConnected id is =", socket.id);

    // Handle chat message
    socket.on("message", (data) => {
        console.log(data);
        socket.broadcast.emit("message", data);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// Port
const port = process.env.PORT || 8000;

server.listen(port, () => {
    console.log(`App is running on port ${port}`);
});

// Start server after database sync
sequelize.sync({ alter: true })
    .then(() => {
        console.log("Database sync successful");
    })
    .catch((err) => {
        console.error("Database sync failed:", err);
    });
