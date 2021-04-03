const { Console } = require("console");
const discord = require("discord.js");
const fs = require("fs");

// a terme ferme Dialogue avec bot genre !config => Quelle module voulez vous config => que ovulez vous faire M=> Modules supprimer 

module.exports = (client, message) => {
    try {
        if (message.author.bot) return;

        // Chargement des configuration dans le client

        let mainConfigurationServer = './ServerData/' + message.guild.id + '/config.json';
        if (fs.existsSync(mainConfigurationServer)) {
            mainConfigurationServer = fs.readFileSync(mainConfigurationServer);
            mainConfigurationServer = JSON.parse(mainConfigurationServer);
            client.configurationServer = mainConfigurationServer;
        }
        else
            return console.log(`Error : Config.json du serveur : ${message.guild.name} \n id du serveur :  ${message.guild.id} est manquant `);

        if (mainConfigurationServer.Prefix && mainConfigurationServer.LstModulesServer) {
            // vérification si la commande est adresser au bot   
            if (message.content.indexOf(mainConfigurationServer.Prefix) !== 0) return;


            const args = message.content.slice(mainConfigurationServer.Prefix.length).trim().split(/ +/g);
            const command = args.shift().toLowerCase();

            if (String.isNullOrEmpty(command))
                return console.log(`Error : votre commande est vide  : ${command}`) // ne pas d'erreur mais lancer le fichier help 
            let objCommand = client.commands.get(command);

            if (!objCommand)
                return console.log("Error : Commande non charger, la commande n'existe pas");

            if (!mainConfigurationServer.LstModulesServer.find(x => x.name == command))
                throw Error(`merci d'activer le module  ${command}`);

            if (objCommand.help.useDataJson) {
                let dataModule = `./ServerData/${message.guild.id}/${command}.json`;
                if (fs.existsSync(dataModule)) {
                    dataModule = fs.readFileSync(dataModule);
                    dataModule = JSON.parse(dataModule);
                    client.dataModule = dataModule;
                    objCommand.run(client, message, args).catch(error => {
                        //message d'erreur 
                        const messageError = new discord.MessageEmbed()
                            .setTimestamp()
                            .setColor(15158332)
                            .setFooter(message.guild.name, message.guild.iconURL)
                            .setAuthor(message.author.username, message.author.avatarURL)
                            .setTitle(":warning: __ un problème est survenue __")
                            .addField("__** Message d'erreur :  **__", error.message)
                            .addField("__**Le problème Perciste ?**__", "Merci de contacté <@200335073403207680> ou un membre du staff");

                        message.channel.send(messageError).then(msgerror => {
                            setTimeout(clear => { msgerror.delete(); message.delete(); }, 4000);
                            return;
                        })
                    });
                }
                else
                    return console.log(`le fichier JSON du module ${command} n'existe pas pour le serveur : ${message.guild.name} Id : ${message.guild.id} \n Merci de crée le ${command}.json`)

                // faire chargement de la configuration  dans un client.configModule
                // et si ya pas alors qu'il est a true peter une erreur 
            }
            else
                objCommand.run(client, message, args).catch(error => {
                    //message d'erreur 
                    const messageError = new discord.MessageEmbed()
                        .setTimestamp()
                        .setColor(15158332)
                        .setFooter(message.guild.name, message.guild.iconURL)
                        .setAuthor(message.author.username, message.author.avatarURL)
                        .setTitle(":warning: __ un problème est survenue __")
                        .addField("__** Message d'erreur :  **__", error.message)
                        .addField("__**Le problème Perciste ?**__", "Merci de contacté <@200335073403207680> ou un membre du staff");

                    message.channel.send(messageError).then(msgerror => {
                        setTimeout(clear => { msgerror.delete(); message.delete() }, 4000);
                        return;
                    })
                })


            // verification si ya un json pour cette commande si oui chargement sinon console.logError Fichier json manquant 
        }
        else
            return console.log("Error : le Config.json du serveur n'est pas bien définie");






        //      
        //             if ((fs.existsSync(pathDirectoryDataServer + message.guild.id + "/" + command + ".json"))) {
        //                 configurationServer = fs.readFileSync(pathDirectoryDataServer + message.guild.id + "/" + command + ".json");
        //                 configurationServer = JSON.parse(configurationServer);
        //             }
        //             // lancement du module 
        //             let commandeFile = require(`./Modules/${command}.js`);
        //             commandeFile.run(client, message, args, configurationServer).catch(error => {
        //                 // message d'erreur 
        //                 const messageError = new discord.MessageEmbed()
        //                     .setTimestamp()
        //                     .setColor(15158332)
        //                     .setFooter(message.guild.name, message.guild.iconURL)
        //                     .setAuthor(message.author.username, message.author.avatarURL)
        //                     .setTitle(":warning: __ un problème est survenue __")
        //                     .addField("__** Message d'erreur :  **__", error.message)
        //                     .addField("__**Le problème Perciste ?**__", "Merci de contacté <@200335073403207680> ou un membre du staff");

        //                 message.channel.send(messageError).then(msgerror => {
        //                     setTimeout(clear => { msgerror.delete(); }, 4000);
        //                     return;
        //                 })
        //             }).then(fctCommandeFini => {
        //                 setTimeout(() => {
        //                     message.delete()
        //                 }, (10000));
        //             });
        //           //chargement de la configuration du module 

        //     }

    }
    catch (error) {
        const messageError = new discord.MessageEmbed()
            .setTimestamp()
            .setColor(15158332)
            .setFooter(message.guild.name, message.guild.iconURL)
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle(":warning: __ un problème est survenue __")
            .addField("__** Message d'erreur :  **__", error.message)
            .addField("__**Le problème Perciste ?**__", "Merci de contacté <@200335073403207680> ou un membre du staff");

        message.channel.send(messageError).then(msgerror => {
            setTimeout(clear => { message.delete(); msgerror.delete(); }, 4000);
            return;
        })
    }
}