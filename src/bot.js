/*
 * Authors: Jeffrey Goldsmith, Liam Armstrong, and Brendan Leder
 *
 * Description: A discord bot with arbitrary functions
 */

const TOKEN = 'MjQzODk3NDI2ODYyMTQ1NTM2.Cv1yJw.9m-SXSeZj8d-OwrgDYOt3aZggVA'; // Bot token

// Import dependencies
const Discord = require('discord.js'); // Import the discord.js module
const wavFileInfo = require('wav-file-info'); // Import .wav metadata grabber API
const bot = new Discord.Client(); // Create an instance of a Discord Client, and call it bot

const slowpokeSoundNames = [
  'slowpoke.wav',
  'slowpokelong.wav',
  'slowpokeslow.wav',
  'slowslowslow.wav',
];

const RANDOM_MAX = slowpokeSoundNames.length - 1;
const RANDOM_MIN = 0;
const CARLOS_ID = '173595969311604736';
const DEFAULT_DELAY = 10;


// Return a random number within a range.
const getRandomInt = (min, max) =>
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


bot.on('ready', () => {
 console.log('I am ready!'); // Signal that bot has launched
});


//
// Event listener for text messages.
//
bot.on('message', message => {

  // Check message content
  if (message.content === '!slow')
  {
    var isChannelFound = false; // Flag to detect if a voice channel corresponding to the message author is found
    const author = message.author; // Message author

    // Search for the voice channel that the user is in
    message.guild.channels.forEach((channel) => {
      if (channel.type === 'voice')
      {
        channel.members.forEach((member) => {
          if (member.id === author.id)
          {
            isChannelFound = true;
            const randomNum = getRandomInt(RANDOM_MIN, RANDOM_MAX); // Get random number to index audio file array
            const path = '../lib/Sounds/' + slowpokeSoundNames[randomNum]; // Choose audio file to play and create a path string for it

            // Enter the channel that the user is currently in
            channel.join().then(connection => {
              const dispatcher = connection.playFile(path); // Play the file

              // Get the length of the audio from the file metadata
              wavFileInfo.infoByFilename(path, function (err, info) {
                if (err) throw err; // Exit if an error is non nil

                // Disconnect after the duration of the audio clip in miliseconds
                setTimeout(() => {
                  connection.disconnect();
                }, info.duration * 1000);
              });
            }).catch(console.error); // Print any errors
          }
        });
      }
    });

    // If the user is not in a voice channel, reply with an error message
    if (!isChannelFound)
    {
      message.reply('Silly Billy, you have to be in a voice channel to do that!');
    }
  }
});

// Log Jekbot in
bot.login(TOKEN);
