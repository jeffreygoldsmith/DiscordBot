/*
 * Authors: Jeffrey Goldsmith and Liam Armstrong
 *
 * Description: A discord bot with arbitrary functions
 */

const Discordie = require("discordie"); // Import Discordie library

const client = new Discordie();

// Connect to Discord server using bot token
client.connect({
  token: "MjQzODk3NDI2ODYyMTQ1NTM2.Cv1yJw.9m-SXSeZj8d-OwrgDYOt3aZggVA" // Bot token
});

client.Dispatcher.on("GATEWAY_READY", e => {
  console.log("Connected as: " + client.User.username); // Print a connected message including the current username
});

//
// Use ping/pong system to test message sending.
//
client.Dispatcher.on("MESSAGE_CREATE", e => {
  console.log('Message Recieved'); // Log that a message was recieved

  if (e.message.content === "Jekbot who is a pleb?") // Check to see if input is ping
  {
    e.message.channel.sendMessage("Carlos is a pleb"); // Send back pong
  }
});
