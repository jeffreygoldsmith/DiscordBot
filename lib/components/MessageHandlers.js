// Import dependencies
const Discord = require('discord.js'); // Import the discord.js module
const ytdl = require('ytdl-core'); // Import youtube core
const wavFileInfo = require('wav-file-info'); // Import .wav metadata grabber API

const slowpokeSoundNames = [
  'slowpoke.wav',
  'slowpokelong.wav',
  'slowpokeslow.wav',
  'slowslowslow.wav',
//  'slowpokeyadon.wav', Not workin for some reason
];

const RANDOM_MAX = slowpokeSoundNames.length - 1; // Number of audio clips zero based
const RANDOM_MIN = 0;


var handlers = {}; // Export modules


// Return a random number within a range.
const getRandomInt = (min, max) =>
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


//
// Function for finding the channel that a given author is currently in.
//
const findChannel = (message, author) =>
{
  var channelFound = null;
  // Search for the voice channel that the user is in
  message.guild.channels.forEach((channel) => {
    if (channel.type === 'voice')
    {
      channel.members.forEach((member) => {
        if (member.id === author.id)
        {
          channelFound = channel;
        }
      });
    }
  });

  return channelFound;
}


//
// Message handler for !slow command -- Enters the channel to play a slowpoke audio clip and then leaves
//
handlers.slow = (message, author) =>
{
  var channelFound = findChannel(message, author);

  if (channelFound)
  {
    const randomNum = getRandomInt(RANDOM_MIN, RANDOM_MAX); // Get random number to index audio file array
    const path = '../lib/sounds/' + slowpokeSoundNames[randomNum]; // Choose audio file to play and create a path string for it

    // Enter the channel that the user is currently in
    channelFound.join().then(connection => {
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

  return channelFound;
}


//
// Message handler for !stream command -- Streams youtube video audio
//
handlers.stream = (message, author) =>
{
  const parsedInput = message.content.split(' ');
  var channelFound = findChannel(message, author);

  if (channelFound)
  {
    // play streams using ytdl-core
    const streamOptions = { seek: 0, volume: 0.1 };
    channelFound.join().then(connection => {
      const stream = ytdl(parsedInput[1], {filter : 'audioonly'});
      const dispatcher = connection.playStream(stream, streamOptions);
    })
    .catch(console.error);
  }

  return channelFound;
}


//
// Message handler for !stop command -- Exits Jekbot from current channel
//
handlers.leave = (message, author) =>
{
  var channelFound = findChannel(message, author);

  if (channelFound)
  {
    console.log('leaving');
    channelFound.leave();
  }
}


module.exports = handlers;
