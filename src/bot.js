/*
 * Authors: Jeffrey Goldsmith, Liam Armstrong, and Brendan Leder
 *
 * Description: A discord bot with arbitrary functions
 */

const express = require('express')
const app = express()
const jekbot = {token: 'MjU0NDQ1NjI0MjAyNzU2MDk2.CyPKew.3JEyRFwd-Ym3QdRK90FZ0I-L7aA', id: '254445624202756096'};
const Discord = require('discord.js'); // Import the discord.js module
const MessageHandler = require('../lib/components/MessageHandlers.js');
const bot = new Discord.Client(); // Create an instance of a Discord Client, and call it bot

var messageQueue = [];


//
// Check if a channel was found if voice communication is required
//
const channelFound = (message, flg) =>
{
  // If the user is not in a voice channel, reply with an error message
  if (!flg)
  {
    message.reply('Silly Billy, you have to be in a voice channel to do that!');
  }
}


//
// Event listener for bot startup.
//
bot.on('ready', () => {
 console.log('I am ready!'); // Signal that bot has launched
});


//
// Event listener for text messages.
//
bot.on('message', message => {
  var isChannelFound = false; // Flag to detect if a voice channel corresponding to the message author is found
  const author = message.author; // Message author

  // Check message content
  if (message.content === '!slow')
  {
    isChannelFound = MessageHandler.slow(message, author);

    // If the user is not in a voice channel, reply with an error message
    channelFound(message, isChannelFound);
  }


  // Check message content
  if (message.content.startsWith('!stream'))
  {
    isChannelFound = MessageHandler.stream(message, author);

    // If the user is not in a voice channel, reply with an error message
    channelFound(message, isChannelFound);
  }


  // Check message content
  if (message.content === '!stop')
    isChannelFound = MessageHandler.leave(message, jekbot);
});


// Log Jekbot in
bot.login(jekbot.token);

app.set('port', (process.env.PORT || 5000))

app.get('/', function(request, response) {
  response.send('Hello World!')
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
