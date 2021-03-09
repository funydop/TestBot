const discord = require("discord.js");
const fs = require("fs");
const client = new discord.Client({ ws: { intents: ['GUILDS', 'GUILD_MESSAGES','GUILD_PRESENCES','GUILD_MEMBERS']} });

// const { Client, Intents } = require('discord.js');
// const myIntents = new Intents();
// myIntents.add('GUILD_PRESENCES', 'GUILD_MEMBERS');
// const client = new Client({ ws: { intents: myIntents } });

const pathDirectoryDataServer = './ServerData/';


client.login("Njc1NzcwNDIzNzExMTA1MDI1.Xj7-QA.LlFiygtQdPX5ivwVbuLptPk-28I");



client.on('guildCreate', function (guild) {
    // Verification que le dossier existe 
    fs.stat(pathDirectoryDataServer + guild.id + "/", function (err) {
        if (!err) {
            console.log('Dossier du serveur existant');
        }
        // il n'existe pas nous créons le dossier 
        else if (err.code === 'ENOENT') {
            fs.mkdir(pathDirectoryDataServer + guild.id, function (err) {
                if (err) {
                    console.log("Nouveau Serveur : \n Creation du dossier KO Erreur : " + err)
                } else {
                    console.log("Nouveau Serveur : \n Creation du dossier OK")
                }
            })
        }
    });
    fs.stat(pathDirectoryDataServer + guild.id + "/config.json", function (err) {
        if (!err) {
            console.log('Fichier Globale du serveur existant');
        }
        // il n'existe pas nous créons le Fichier et on l'initialise ( préfix ou autre)
        else if (err.code === 'ENOENT') {
            const callback = function (err) {
                if (err)
                    console.log("Creation du fichier KO Erreur : " + err);
                else
                    console.log("Creation du fichier du serveur OK ");
            };
            // Création de l'object De base 
            objectGlobal = new Object();
            objectGlobal.Prefix = "!";
            objectGlobal.LstModulesServer = [{ "name": "help" }, { "name": "config" }];
            objectGlobal.RolesWhitList = [""];
            // Conversion Object To Json
            objectGlobal = JSON.stringify(objectGlobal);
            fs.writeFile(pathDirectoryDataServer + guild.id + "/config.json", objectGlobal, callback)
        }
    });
});

client.on('message', function (message) {
    try {
        if (message.author.bot) return;
        
        // Chargement de la configuration du serveur 
        let configurationServer = pathDirectoryDataServer + message.guild.id + '/config.json';
        if (fs.existsSync(configurationServer)) {
            configurationServer = fs.readFileSync(configurationServer);
            configurationServer = JSON.parse(configurationServer);

            const args = message.content.slice(configurationServer.Prefix.length).trim().split(/ +/g);
            const command = args.shift().toLowerCase();
            
            // vérification de la commande 
            if (message.content.indexOf(configurationServer.Prefix) !== 0) return;
            console.log("commande : " + configurationServer.Prefix + command);


            if (String.isNullOrEmpty(command))
                throw new Error("votre commande est vide  : `" + command + "`") // ne pas d'erreur mais lancer le fichier help 
            if (!configurationServer.LstModulesServer.find(x => x.name == command)) 
                throw new Error("merci d'activer le module " + command  );
            
                if ((fs.existsSync(pathDirectoryDataServer + message.guild.id + "/" + command + ".json"))) {
                    configurationServer = fs.readFileSync(pathDirectoryDataServer + message.guild.id + "/" + command + ".json");
                    configurationServer = JSON.parse(configurationServer);
                }
                // lancement du module 
                let commandeFile = require(`./Modules/${command}.js`);
                commandeFile.run(client, message, args, configurationServer).catch(error => {
                    // message d'erreur 
                    const messageError = new discord.MessageEmbed()
                        .setTimestamp()
                        .setColor(15158332)
                        .setFooter(message.guild.name, message.guild.iconURL)
                        .setAuthor(message.author.username, message.author.avatarURL)
                        .setTitle(":warning: __ un problème est survenue __")
                        .addField("__** Message d'erreur :  **__", error.message)
                        .addField("__**Le problème Perciste ?**__", "Merci de contacté <@200335073403207680> ou un membre du staff");

                    message.channel.send(messageError).then(msgerror => {
                        setTimeout(clear => { msgerror.delete(); }, 4000);
                        return;
                    })
                }).then(fctCommandeFini => {
                    setTimeout(() => {
                        message.delete()
                    }, (10000));
                });
              //chargement de la configuration du module 

        }
        else
            throw new Error("Le fichier `config.json` du serveur est manquant");
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

})


client.on('guildMemberAdd', member =>{
    client.user.setActivity("Membre : "+member.guild.memberCount,{ type: 'WATCHING' });
})
client.on('guildMemberRemove', member =>{
    client.user.setActivity("Membre : "+member.guild.memberCount,{ type: 'WATCHING' });
})
String.isNullOrEmpty = function (value) {
    return !(typeof value === "string" && value.length > 0);
}