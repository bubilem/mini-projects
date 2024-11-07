import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"

const app = express()
const server = createServer(app)
const io = new Server(server)
app.use(express.static("public"))

io.on("connection", (socket) => {
  console.log("New user connected:", socket.id)
  socket.on("clientSentMessage", (message) => {
  const time = new Date().toLocaleTimeString("cs-CZ")
  message.time = time  
  io.emit("serverSentMessage", message)  
  })
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id)
  })
})

server.listen(3333, () => {
  console.log("Chat server running on http://localhost:3333")
})
