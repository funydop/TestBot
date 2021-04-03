const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (client, message, args) => {
if(!args[0])
throw Error("merci de mettre un argument valide ex : `"+client.configurationServer.Prefix+"getid #salon`"); // retravailler 

let valeur = args[0].replace(">","").replace("<","").replace("#","").replace("!","").replace("@","").replace("&","");
let messageInfo = new Discord.MessageEmbed()
.setTitle("__**❓ GetIdentifiant ❓**__")
.setDescription("voici l'identifiant que tu cherche : `" + valeur+"`")
.setFooter(message.guild.name,message.guild.iconURL())
.setTimestamp()
.setColor(3447003);

message.channel.send(messageInfo).then(messageSend=>{
    setTimeout(() => {
        message.delete();
        messageSend.delete();
    }, (50000));
});

}

module.exports.help = {
    name: "getid",
    description: "retourne l'id d'une emojie",
    help:"-**Obtient** l'identifian d'un emoji sur le serveur ",
    useDataJson : false

};