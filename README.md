# Sphynx
A discord bot which is written in node.js and uses discord.js as the Base module.

## Installing  
### Step 1: Cloning the repository and installing node.js & NPM/yarn
First you need to clone the repository, by downloading as a zip file. You can click the "clone or download" button to clone this repo. You should also download node.js, and yarn/NPM for pkg updates. Note: NPM is now default installed with nodejs.

### Step 2: Creating the bot
You need to create a new application on [discord developer portal](https://discord.com/developers/applications). Then you will need to:
* Create a new application by clicking "create a new application".

* Give the bot's name.

* Upload the bot's avatar and a description. (Optional)

* On the bot section, select add bot.

* Select bot, and permissions. (Important!)

* Copy the url, and go to it to invite the bot.

* That's it! You created the bot!
  
### Step 3: scripts to do

* You have downloaded the zip mentioned in step 1 nah? So run these scripts on the terminal:

```sh 
yarn # for npm, use npm i
```
### Step 4: Create .env file

* You need to create a .env file, and enter the contents below:

```node.js
TOKEN = your_bot_token
BOTMASTER = your_discord_id
```

* Change `your_bot_token` to your bot's token, and `your_discord_id` to your discord ID.
      
### Starting

After following the above steps, you can start the bot with `node .`.

## contributing

If you want to contribute to this project, Feel free to open a pull request! This will run a CI with a linter, to check if your contributing have errors. Dont leak your bot details here!
