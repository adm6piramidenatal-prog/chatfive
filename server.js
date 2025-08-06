const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, "public")));

// Quando acessar "/", envie o arquivo index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Socket.io: conexão de novos usuários
io.on("connection", (socket) => {
  console.log("Novo usuário conectado");

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg); // envia para todos
  });

  socket.on("disconnect", () => {
    console.log("Usuário saiu");
  });
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
