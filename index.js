const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { protect } = require("./middleware/authMiddleware");
const rateLimiter = require("./middleware/rateLimiter");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "https://frontend-alluvuim.vercel.app", // Allow requests from any origin (adjust as needed)
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(rateLimiter); // Apply rate limiting middleware

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

// WebSocket connection
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("joinRoom", ({ username, room }) => {
    socket.join(room);
    const joinMessage = {
      user: { username: "admin" },
      text: `${username} has joined!`,
    };
    io.to(room).emit("message", joinMessage);
  });

  socket.on("sendMessage", async ({ text, username, room }) => {
    const messageData = {
      user: username,
      text,
      room,
    };

    // Save the message to the database if required
    // Example: Assuming you have a function to save messages in your chat controller

    // Emit the message to all clients in the room
    io.to(room).emit("message", messageData);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
