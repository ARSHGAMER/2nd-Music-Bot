const { MessageEmbed } = require("discord.js")
const { readdirSync } = require("fs")
const { COLOR } = require("../config.json");
module.exports = {
  name: "help",
  description: "Get all commands name and description",
  execute (client, message, args) {
    
    
let embed = new MessageEmbed()
.setAuthor("HELP SECTION", client.user.displayAvatarURL())
.setThumbnail(client.user.displayAvatarURL())
.setColor(COLOR)
.setDescription(`These Are The Commands Of ${client.user.username} Bot`)
.setFooter(`Handle by ArshGamer#0001`)
let command = readdirSync("./commands")    

let i;
    for(i = 0; i < command.length; i++) {
      console.log(command[i])
      
      const cmd = client.commands.get(command[i].replace(".js", ""))
      embed.addField(`**${cmd.name}**`, cmd.description, true)
      
    }
    
    message.channel.send(embed)
  
    
     if (!message.guild.me.hasPermission("EXTERNAL_EMOJIS")) return message.reply("I Dont Have External Emojis Permissions.");  
    message.react("704946210058010664");

    
    
    
  }
}