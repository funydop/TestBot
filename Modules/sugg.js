const  Discord = require("discord.js");


module.exports.run = async (client, message, args, config) => {
if(!config.salonCommande)
throw Error("Paramètre : salonSuggestion manquant dans la configuration sugg.json");
if(message.channel.id != config.salonCommande)
throw Error ("Merci de vous rendre dans le salon <#"+config.salonCommande+">");

var messagePlayer = message;
 var content = messagePlayer.content.split(' ')[1];
if(!content)  
throw Error("merci de mettre un message valide");
const suggestion = new Discord.MessageEmbed()
        .setFooter(message.guild.name,message.guild.iconURL())
        .setTitle("__**✭ New Suggestion de "+message.author.username+" ✭**__")
        .setTimestamp()
        .setColor(7339827)
        .setDescription(messagePlayer.content.replace("!sugg "));
let salon = message.guild.channels.cache.get(config.salonSuggestion);
    salon.send(suggestion).then(msg=>{
    msg.react('✔');
    msg.react('❌');
})
// throw Error("Merci de vous randre dans le salon : <@#"+config.salonSuggestion+">");
    



}
module.exports.help = {
    name: "sugg",
    description: "permette de faire une suggestion",
    help: "-**Suggère** une idée sur le serveur",
    useDataJson : true

};