const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (client, message, args) => {

let MessageHelp = new Discord.MessageEmbed()
.setTitle("__**⁉ Menu aide ⁉**__")
.setDescription("Bienvenue sur l'aide voici les différente modules activer sur le serveur, voici quelque information")
.setFooter(message.guild.name,message.guild.iconURL())
.setTimestamp()
.setColor(12370112);
    
client.commands.forEach(element => {
        if(client.configurationServer.LstModulesServer.find( x => x.name == element.help.name))
            MessageHelp.addField("Commande : `"+client.configurationServer.Prefix+element.help.name+"`",element.help.help)
    });
    message.channel.send(MessageHelp).then(messageSend=>{
            setTimeout(() => {
                message.delete();
                messageSend.delete();
            }, (50000));
        });

    //     console.log(lstModules);
    // // construction de la chaine de caractère  

    // config.LstModulesServer.forEach(element => {
    //     if (lstModules.listmodules.find(x => x.name == element.name)) {
    //         let module = lstModules.listmodules.find(x => x.name == element.name);
    //         stringtoHelp = stringtoHelp + "`" + config.Prefix + module.name + "` :" + module.help + "\n";
    //     }
    //     else
    //         throw new Error("Commande manquant dans le lstModules.json");
    // });



    // let helpEmbed = new Discord.MessageEmbed()
    //     .setFooter(message.guild.name, message.guild.iconURL)
    //     .setAuthor(message.author.username, message.author.avatarURL)
    //     .setTimestamp()
    //     .setColor(7339827)
    //     .addField("__**Liste des commandes :**__", "Menu d'aide du Bot ! Apprenez toutes les commandes :")
    //     .addField("__**Commandes**__", stringtoHelp)

    // return message.channel.send(helpEmbed).then(messageSend=>{
    //     setTimeout(() => {
    //         messageSend.delete();
    //     }, (10000));
    // })

}
// pour l'instant rester cpùùe àa mais au finale reussi a faire en fonction de la permission de la personne

// fait une commande Calenda lier a gooogle Agenda 
module.exports.help = {
    name: "help",
    description: "permete de vous aider",
    help: "-**Informe** sur les modules actif sur le serveur ",
    useDataJson: false
};