const discord = require("discord.js")
const client = new discord.Client({ disableEveryone: true, disabledEvents: ["TYPING_START"] });
const { readdirSync } = require("fs");
const { join } = require("path");
const { TOKEN, PREFIX } = require("./config.json")

//CLIENT EVENTS
//client.on("ready", () => {
  //console.log('Ready to play song '),
  //client.user.setActivity(`f?help | `)
  //type: "LISTENING"
//});
client.on("ready", () => {
	console.log("Music IS Online");
	client.user.setPresence({
		activity: {
			type: "LISTENING",
			//url: "https://twitch.tv/nauticaljeans84",
			name: `ep!help | Playing with ${client.users.cache.size} users And ${client.guilds.cache.size} Servers`
		}
	});
setInterval(() => { client.user.setPresence({
		activity: {
			type: "LISTENING",
			//url: "https://twitch.tv/nauticaljeans84",
			name: `ep!help | Playing with ${client.users.cache.size} users And ${client.guilds.cache.size} Servers`
		}
	});
  }, 300000);
});


client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});


client.on("warn", info => console.log(info));

client.on("error", console.error)

//DEFINIING
client.commands = new discord.Collection()
client.prefix = PREFIX
client.queue = new Map();
client.vote = new Map();

//LETS LOAD ALL FILES
const cmdFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"))
for (const file of cmdFiles) {
  const command = require(join(__dirname, "commands", file))
  client.commands.set(command.name, command)
} //LOADING DONE


//WHEN SOMEONE MESSAGE
client.on("message", message => {
   if (message.author.bot) return;
  if (!message.guild) return;
  
  if(message.content.startsWith(PREFIX)) { //IF MESSSAGE STARTS WITH MINE BOT PREFIX
    
    const args = message.content.slice(PREFIX.length).trim().split(/ +/) //removing prefix from args
    const command = args.shift().toLowerCase();
    
    if(!client.commands.has(command)) {
      return;
    } 
    
  try  { //TRY TO GET COMMAND AND EXECUTE
      client.commands.get(command).execute(client, message, args)
    //COMMAND LOGS
    console.log(`${message.guild.name}: ${message.author.tag} Used ${client.commands.get(command).name} in #${message.channel.name}`)
    } catch (err) { //IF IT CATCH ERROR
      console.log(err)
      message.reply("I am getting error on using this command")
    }
    
  }
  
  
});




//DONT DO ANYTHING WITH THIS TOKEN lol
client.login(TOKEN)