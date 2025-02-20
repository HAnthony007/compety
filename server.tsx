import { createServer } from "http";
import { Server } from "socket.io";

const PORT = process.env.SOCKET_PORT || 3001;

const httpServer = createServer((req, res) => {
  res.writeHead(200);
  res.end("Socket.io server is running");
});

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`Client connecté: ${socket.id}`);

  socket.on("message", (data) => {
    console.log("Message reçu :", data);
    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log(`Client déconnecté: ${socket.id}`);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Serveur Socket.io écoute sur le port ${PORT}`);
});
