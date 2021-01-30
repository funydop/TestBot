const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (message,args,config) => {
    let lstModules = __dirname + '/../ServerData/lstModules.json';
    if (fs.existsSync(lstModules)) {
        lstModules = fs.readFileSync(lstModules);
        lstModules = JSON.parse(lstModules);
    } else
        throw new Error("le fichier lstModules.json est manquant");

        console.log(lstModules);
    // construction de la chaine de caractère  
    var stringtoHelp = "";

    config.LstModulesServer.forEach(element => {
        if (lstModules.listmodules.find(x => x.name == element.name)) {
            let module = lstModules.listmodules.find(x => x.name == element.name);
            stringtoHelp = stringtoHelp + "`" + config.Prefix + module.name + "` :" + module.help + "\n";
        }
        else
            throw new Error("Commande manquant dans le lstModules.json");
    });



    let helpEmbed = new Discord.MessageEmbed()
        .setFooter(message.guild.name, message.guild.iconURL)
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTimestamp()
        .setColor(7339827)
        .addField("__**Liste des commandes :**__", "Menu d'aide du Bot ! Apprenez toutes les commandes :")
        .addField("__**Commandes**__", stringtoHelp)

    return message.channel.send(helpEmbed)

}
// pour l'instant rester cpùùe àa mais au finale reussi a faire en fonction de la permission de la personne 
