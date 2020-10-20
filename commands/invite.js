const { MessageEmbed } = require("discord.js")
const { inviteURL } = require("../config.json")
module.exports = {
  name: "invite",
  description: "invite the bot in your server",
  execute (client, message, args)  {
  
  let embed = new MessageEmbed()
  .setTitle("Invite The Bot")
  .setColor("RED")
  .setDescription(`[Click Me To Add Bot](${inviteURL}) `); //Looks Cool
    
    
    return message.channel.send(embed)
  
}
}