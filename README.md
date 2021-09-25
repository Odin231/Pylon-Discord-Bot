# Pylon-Discord-Bot
## Discord-Bot deployed via Pylon
The idea behind this bot is to offer specialized conversions needed in an international simracing community. 
### What does this bot do?
Right now the bot is able to translate values from metric to imperial and back. For example from litres to gallons, or Celsius to Fahrenheit. (A list with all the unit the bot can handle will follow).
### How does the bot work?
This bot is different to "normal" bots you might have encountered. Instead of listening to commands ("!bot" or "!translate" or something), it reads out every message sent and checks if there are any units the bot knows. If the bot finds a value and a unit (for example "10 liter") the bot will send a message with the found value and the translated value. As of now the bot can only do a 1:1-translation, meaning you can for example only go from Inch to Millimeter, but not to Meters. This feature might follow in later versions.
### How do I make the bot run?
In the moment the bot is running via an external hosting service called "Pylon" ( https://pylon.bot/ ). Since I can't find a way to check out the git-repo directly into pylon and copying every file by hand I'm going to keep the number of files as small as possible.  
### How can you use the bot? 
The bot is pretty dumb regarding inputs. So it is enough to just send a message like "20 liter", or "400 mm" and the bot will translate it into it's predefined counterpart.  I implemented no upper limit regarding text length, so I guess the sky (and the sever capacities from Pylon) is the limit.
**Important:** You need to leave a space between value and unit (neither 20L nor 20  L will work!) 

#### Table of currently supported Units
![grafik](https://user-images.githubusercontent.com/29162492/134780756-85c6d086-a7c3-4641-8b5e-42408bd26f58.png)
