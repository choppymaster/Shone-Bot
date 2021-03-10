require('dotenv').config()

//import dependencies 
const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')
client.logger = require("./modules/logger.js")

// Command handling 
client.commands = new Discord.Collection()

fs.readdirSync("./src/commands/").forEach(dir => {
  const commandfiles = fs.readdirSync(`./src/commands/${dir}`).filter(file => file.endsWith('.js'))
  for (const file of commandfiles) {
    const command = require(`./commands/${dir}/${file}`)
    client.commands.set(command.name, command)
  }
})

client.on('ready', () => {
  client.logger.info('I am ready to go.')
  client.user.setPresence({ activity: { name: 'Super Mario Bros 2', type: 'PLAYING' }, status: 'idle' })

})

// message things
client.on("message", async message => {
  //message things needed
  
  const prefix = "."
  if (message.author.bot || !message.content.startsWith(prefix)) return;
 
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const commandName = args.shift().toLowerCase()
 
  // command
  if (!client.commands.has(commandName)) return;
  const command = client.commands.get(commandName)

  try {
    command.execute(client, message, args)
  } catch (error) {
    client.logger.error(error)
    message.channel.send(`Sorry! There was an error while executing the command! \nError: ${error}`)
  }

  client.logger.info(`${message.author.tag} | ${message.author.id} command: ${command.name} Guild: ${message.guild} | ${message.guild.id}`)

  // permissions 
  if (command.permissions) {
    const authorPerms = message.channel.permissionsFor(message.author)
    if (!authorPerms || !authorPerms.has(command.permissions)) {
      return message.channel.send('Insufficient permissions')

    }
  }

  if (command.guildOnly && message.channel.type === "dm") {
    message.delete()
    return message.channel.send("This command cant be executed in DMs").then(m => m.delete({ timeout: 10000 }))
  }

  if (command.botMaster && message.author.id !== process.env.BOTMASTER) {
    message.delete()
    return message.channel.send("This command is for bot masters only").then(m => m.delete({ timeout: 10000 }))
  }

})

// mongoose connection 
require("./modules/db/mongo.js").init(client)

// import the token!
client.login(process.env.TOKEN)