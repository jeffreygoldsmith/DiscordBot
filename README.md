# Jekbot

A discord bot that uses Discord.js for my personal use that has arbitrary functions.

##Setup

1. Download this repository using the green download button and put it onto your desktop
2. Install the current Nodejs build using this link: https://nodejs.org/en/
3. Once installed, open Terminal or Command Prompt
4. Navigate to the repository folder on your desktop using the command prompt. Use the `cd` (change directory) and `ls` (list files in current directory, for PC this command is `dir`) commands to get to your desktop. If you have trouble watch a video on the topic: https://www.youtube.com/results?search_query=how+to+navigate+terminal. Once you are in the directory of the repository, your terminal should say something like this: '~/Desktop/github/DiscordBot'.
5. Now type `npm install` into the terminal and press enter
6. Once this command finishes running type `npm start` to run the bot!

##Adding Sounds
To add sounds, copy and paste the code below into the MessageHandlers.js file, replacing the highlighted items with your version. You will have to replace things wherever it says `yourClipNameHere`, `yourCommandNameHere`, and the `const path` variable with your file path with single quotes on either side. Look at the `const path` variable in the `handlers.slow = (message, author) =>` if you have trouble. 

```
//
// Message handler for !yourCommandNameHere command -- Enters the channel to play a yourClipNameHere audio clip and then leaves
//
handlers.yourCommandNameHere = (message, author) =>
{
  var channelFound = findChannel(message, author);

  if (channelFound)
  {
    const path = 'Inside here place the file path of your sound, look at the other functions for example on what that path is'; // Choose audio file to play and create a path string for it

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
```

After you are done this, add the following code to the bot.js file inside of the `bot.on('message', message => {` function. Look at the other functions in there for some guidance on where to place it.

```
// Check message content
if (message.content === '!yourCommandNameHere')
{
  isChannelFound = MessageHandler.yourCommandNameHere(message, author);

  // If the user is not in a voice channel, reply with an error message
  channelFound(message, isChannelFound);
}
```

Then restart the bot and type in your command!
