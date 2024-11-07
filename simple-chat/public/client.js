const socket = io()

const messages = document.getElementById("messages")
const nameInput = document.getElementById("nameInput")
const messInput = document.getElementById("messInput")
const sendButton = document.getElementById("sendButton")

sendButton.onclick = (e) => {
  e.preventDefault()
  socket.emit("clientSentMessage", {
    name: nameInput.value,
    mess: messInput.value,
  })
}

socket.on("serverSentMessage", (message) => {
  const messdiv = document.createElement("div")
  messdiv.innerHTML = `<p class="name"><b>${message.name}</b> ${message.time}</p><p class="mess">${message.mess}</p>`
  messages.appendChild(messdiv)
  messages.scrollTop = messages.scrollHeight
})
