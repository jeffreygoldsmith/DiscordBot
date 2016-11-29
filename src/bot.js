/*
 * Authors: Jeffrey Goldsmith and Liam Armstrong
 *
 * Description: A discord bot with arbitrary functions
 */

 // import the discord.js module
 const Discord = require('discord.js');

 // create an instance of a Discord Client, and call it bot
 const bot = new Discord.Client();

 // the token of your bot - https://discordapp.com/developers/applications/me
 const token = 'MjQzODk3NDI2ODYyMTQ1NTM2.Cv1yJw.9m-SXSeZj8d-OwrgDYOt3aZggVA';

 // the ready event is vital, it means that your bot will only start reacting to information
 // from Discord _after_ ready is emitted.
 bot.on('ready', () => {
   console.log('I am ready!');
 });

 // // create an event listener for messages
 // bot.on('message', message => {
 //   // if the message is "ping",
 //   if (message.content === 'enter')
 //   {
 //
 //     //console.log(message.guild.channels);
 //     message.guild.channels.forEach((channel) => {
 //       if (channel.name === 'League of Legends')
 //       {
 //         channel.join();
 //       }
 //     });
 //   }
 //
 //   if (message.content === 'leave') {
 //         channel.leave();
 //       }
 //     });
 //   }
 // });

 // create an event listener for messages
 bot.on('message', message => {
   // if the message is "ping",
   if (message.content === '!slo')
   {
     const author = message.author;

     message.guild.channels.forEach((channel) => {
       if (channel.type === 'voice')
       {
         channel.members.forEach((member) => {
           if (member.id === author.id)
           {
             channel.join().then(connection => {
               const dispatcher = connection.playFile('../lib/Sounds/airhorn.mp3');
             }).catch(console.error);
           }
         });
       }
     });
   }
 });

 // log our bot in
 bot.login(token);
