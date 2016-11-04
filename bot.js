const Discordie = require("discordie");
const client = new Discordie();

client.connect({
  token: "MjQzODk3NDI2ODYyMTQ1NTM2.Cv1yJw.9m-SXSeZj8d-OwrgDYOt3aZggVA"
});

// When Jekbot connects to the server
client.Dispatcher.on("GATEWAY_READY", e => {
  console.log("Connected as: " + client.User.username);
});

// When a user creates a new message
client.Dispatcher.on("MESSAGE_CREATE", e => {
  console.log('Message Recieved'); // Log that a message was recieved

  if (e.message.content === "Jekbot who is a pleb?")
  {
    e.message.channel.sendMessage("Carlos is a pleb");
  }
});
