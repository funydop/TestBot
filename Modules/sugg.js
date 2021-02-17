const  Discord = require("discord.js");


module.exports.run = async (client, message, args, config) => {
if(!config.salonSuggestion)
throw Error("Paramètre : salonSuggestion manquant dans la configuration sugg.json");
if(message.channel.id != config.salonSuggestion)
throw Error ("Merci de vous rendre dans le salon <#"+config.salonSuggestion+">");

var messagePlayer = message;
 var content = messagePlayer.content.split(' ')[1];
 console.log(content);
if(!content)  
throw Error("merci de mettre un message valide");
console.log(message.guild.iconURL());
const suggestion = new Discord.MessageEmbed()
        .setFooter(message.guild.name,message.guild.iconURL())
        .setTitle("__**✭ New Suggestion de "+message.author.username+" ✭**__")
        .setTimestamp()
        .setColor(7339827)
        .setDescription(messagePlayer.content.replace("!sugg "));

messagePlayer.channel.send(suggestion).then(msg=>{
    msg.react('✔');
    msg.react('❌');
})
// throw Error("Merci de vous randre dans le salon : <@#"+config.salonSuggestion+">");
    



}
