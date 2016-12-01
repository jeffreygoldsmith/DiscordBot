/*
 * Authors: Jeffrey Goldsmith and Liam Armstrong
 *
 * Description: A discord bot with arbitrary functions
 */

const Discord = require('discord.js'); // Import the discord.js module
const wavFileInfo = require('wav-file-info'); // Import .wav metadata grabber API
const bot = new Discord.Client(); // Create an instance of a Discord Client, and call it bot
const token = 'MjQzODk3NDI2ODYyMTQ1NTM2.Cv1yJw.9m-SXSeZj8d-OwrgDYOt3aZggVA'; // Bot token

const slowpokeSoundNames = [
  'slowpoke.mp3',
  'slowpokelong.mp3',
  'slowpokeslow.mp3',
  'slowslowslow.mp3',
];

const RANDOM_MAX = slowpokeSoundNames.length - 1;
const RANDOM_MIN = 0;
const CARLOS_ID = '173595969311604736';


//
// Return a random number within a range.
//
function getRandomInt(min, max)
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

  if (message.content === '!slow')
  {
   const author = message.author;

   message.guild.channels.forEach((channel) => {
     if (channel.type === 'voice')
     {
       channel.members.forEach((member) => {
         if (member.id === author.id)
         {
           const randomNum = getRandomInt(RANDOM_MIN, RANDOM_MAX);
           const path = '../lib/Sounds/' + slowpokeSoundNames[randomNum];

           channel.join().then(connection => {
             const dispatcher = connection.playFile(path);
           }).catch(console.error);
          // console.log(message.guild.members);
         }
       });
     }
   });
  }

  //! My jank way of getting the bot to leave for now
  if (message.content === '!leave')
  {
   const author = message.author;

   message.guild.channels.forEach((channel) => {
     if (channel.type === 'voice')
     {
       channel.members.forEach((member) => {
         if (member.id === author.id)
         {
           channel.leave();
         }
       });
     }
   });
  }
});

// log Jekbot in
bot.login(token);
